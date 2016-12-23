const { maxSatisfying } = require('semver');
const getPackage = require('./getPackage');
const FetchedVersions = require('./FetchedVersions');

const fetchedVersions = new FetchedVersions();

const dependencyTree = (dependencies) => {
	const node = {};
	return Promise.all(Object.keys(dependencies || {})
		.map((name) => {
			// package exists further up the tree
			const range = dependencies[name];
			const packageVersions = fetchedVersions.get(name);
			if (packageVersions.length && maxSatisfying(packageVersions, range)) {
				return Promise.resolve();
			}
			return getPackage(name, dependencies[name]);
		})
	)
	.then((results) => {
		// if no dependencies or the dependency has been fetched earlier
		if (!results.length) return;
		// Promise.resolve() will return a promise of undefined and therefore
		// we need to check if there are any packages that were downloaded
		const packages = results.filter((p) => p);

		packages.forEach((package) => {
			fetchedVersions.set(package.name, package.version);
			node[package.name] = {
				name: package.name,
				version: package.version,
				tarball: package.dist.tarball,
			};
		});

		const pms = packages.map(({ name, dependencies }) => {
			return dependencyTree(dependencies)
			.then((deps) => {
				node[name].dependencies = deps;
			});
		});

		return Promise.all(pms);
	})
	.then(() => node);
};


module.exports = dependencyTree;
