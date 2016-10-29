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

module.exports = { getAsyncPackage };
