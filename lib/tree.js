const getPackage = require('./getPackage');


const dependencyTree = (dependencies) => new Promise((resolve, reject) => {
	const node = {};
	Promise.all(Object.keys(dependencies || {}).map((k) => {
		return getPackage(k, dependencies[k]);
	}))
	.then((results) => {
		if (!results.length) return resolve(node);
		const pms = results.map((result) => {
			node[result.name] = {
				name: result.name,
				version: result.version,
				tarball: result.dist.tarball,
			};
			return dependencyTree(result.dependencies)
			.then((deps) => {
				node[result.name].dependencies = deps;
				return deps;
			});
		});
		Promise.all(pms).then(() => resolve(node));
	});
});

/*
{
	name: 'package-1',
	version: '1.11.0',
	dist: 'http://npm/~/package-1.tgz',
	dependencies: {
		package-2: {
			name: 'package-2',
			version: '1.12.0',
			dist: 'http://npm/~/package-2.tgz',
			dependencies: {
				package-4: {
					name: 'package-4'
					version: '2.5.0',
					dist: 'http://npm/~/package-4.tgz',
					dependencies: {
						package-5: {
							name: 'package-5'
							version: '0.0.1',
							dist: 'http://npm/~/package-5.tgz',
							dependencies: null,
						},
					},
				}
			}
		},
		package-3: {
			name: 'package-3',
			version: '2.1.0',
			dist: 'http://npm/~/package-3.tgz',
		},
	},
}
*/

module.exports = dependencyTree;
