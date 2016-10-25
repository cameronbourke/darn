const request = require('request');
const fetch = require('node-fetch');
const { map, isEmpty } = require('ramda');

const { REGISTRY, PGK_NAME } = require('./constants');

const getPackage = (packageName) => {
	switch (packageName) {
		case 'package-1':
			return {
				name: 'package-1',
				version: '1.11.0',
				dist: {
					tarball: 'http://npm/~/package-1.tgz',
				},
				dependencies: {
					'package-2': '1.12.0',
					'package-3': '2.1.0',
				},
			};
		case 'package-2':
			return {
				name: 'package-2',
				version: '1.12.0',
				dist: {
					tarball: 'http://npm/~/package-2.tgz',
				},
				dependencies: {
					'package-4': '2.5.0',
				},
			};
		case 'package-3':
			return {
				name: 'package-3',
				version: '2.1.0',
				dist: {
					tarball: 'http://npm/~/package-3.tgz',
				},
				dependencies: null,
			};
		case 'package-4':
			return {
				name: 'package-4',
				version: '2.5.0',
				dist: {
					tarball: 'http://npm/~/package-4.tgz',
				},
				dependencies: {
					'package-5': '0.0.1',
				},
			};
		case 'package-5':
			return {
				name: 'package-5',
				version: '0.0.1',
				dist: {
					tarball: 'http://npm/~/package-5.tgz',
				},
				dependencies: null,
			};
	}
}

const getAsyncPackage = (packageName) => new Promise((resolve, reject) => {
	switch (packageName) {
		case 'package-1':
			return resolve({
				name: 'package-1',
				version: '1.11.0',
				dist: {
					tarball: 'http://npm/~/package-1.tgz',
				},
				dependencies: {
					'package-2': '1.12.0',
					'package-3': '2.1.0',
				},
			});
		case 'package-2':
			return resolve({
				name: 'package-2',
				version: '1.12.0',
				dist: {
					tarball: 'http://npm/~/package-2.tgz',
				},
				dependencies: {
					'package-4': '2.5.0',
				},
			});
		case 'package-3':
			return resolve({
				name: 'package-3',
				version: '2.1.0',
				dist: {
					tarball: 'http://npm/~/package-3.tgz',
				},
				dependencies: null,
			});
		case 'package-4':
			return resolve({
				name: 'package-4',
				version: '2.5.0',
				dist: {
					tarball: 'http://npm/~/package-4.tgz',
				},
				dependencies: {
					'package-5': '0.0.1',
				},
			});
		case 'package-5':
			return resolve({
				name: 'package-5',
				version: '0.0.1',
				dist: {
					tarball: 'http://npm/~/package-5.tgz',
				},
				dependencies: null,
			});
	}
});


const dependencyTree = (dependencies) => {
	const node = {};
	Object.keys(dependencies || {}).forEach((depName) => {
		const dep = getPackage(depName);
		node[depName] = {
			name: dep.name,
			version: dep.version,
			dist: dep.dist.tarball,
			dependencies: dependencyTree(dep.dependencies),
		};
	});
	return node;
}

const asyncDependencyTree = (dependencies) => new Promise((resolve, reject) => {
	const node = {};
	Object.keys(dependencies || {}).forEach((depName) => {

		getAsyncPackage(depName).then((dep) => {
			node[depName] = {
				name: dep.name,
				version: dep.version,
				dist: dep.dist.tarball,
				dependencies: asyncDependencyTree(dep.dependencies),
			};
		});

	});
	return resolve(node);
});

//
// 	getPackage(packageName)
// 	// .then((res) => res.json())
// 	.then((packageJson) => {
// 		const { dist, version, dependencies } = packageJson;
// 		if (dependencies == null) return resolve(tree);
// 		const package = {
// 			name: packageName,
// 			version: version,
// 			dist: dist.tarball,
// 			dependencies: {},
// 		};
//
// 		tree[packageName] = package;
//
// 		Object.keys(dependencies).forEach((key) => {
// 			// console.log('key', key, 'v', dependencies[key]);
// 			buildTree(tree, key).then((dependencies) => {
// 				// console.log('dependencies', dependencies);
// 				package.dependencies[key] = dependencies;
// 			});
// 		});
//
// 		// return resolve(tree);
// 	})
// 	.catch(resolve);
// });

const p = { 'package-1': '1.15.3' };
console.log('p.dependencies', p.dependencies);

const syncTree = dependencyTree(p);
console.log(
	'sync dependency tree',
	JSON.stringify(syncTree, null, 3)
);

asyncDependencyTree(p).then((tree) => {
	console.log(
		'async dependency tree',
		JSON.stringify(tree, null, 3)
	);
});


// tree
// .then((tree) => {
// 	console.log('tree', tree);
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
// })
// .catch((err) => {
// 	console.log('err', err);
// })

module.exports = dependencyTree;
