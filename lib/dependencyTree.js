const { maxSatisfying } = require('semver');
const getPackage = require('./getPackage');
const fetchedVersions = require('./fetchedVersions');

const dependencyTree = (dependencies) => {
	const node = {};
	return Promise.all(Object.keys(dependencies || {})
		.map((name) => {
			// package exists further up the tree
			const range = dependencies[name];
			const versions = fetchedVersions.get(name);
			if (versions.length && maxSatisfying(versions, range)) return Promise.resolve();
			return getPackage(name, dependencies[name]);
		})
	)
	.then((results) => {
		// if no dependencies or the dependency has been fetched earlier
		if (!results[0] || !results.length) return;

		results.forEach((result) => {
			fetchedVersions.set(result.name, result.version);
			node[result.name] = {
				name: result.name,
				version: result.version,
				tarball: result.dist.tarball,
			};
		});

		const pms = results.map(({ name, dependencies }) => {
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
