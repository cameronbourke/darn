const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const request = require('request');
const tar = require('tar');

const mkdir = require('../util/mkdir');
const { PGKS_LOCATION, PGK_DIR } = require('./constants');

const writeDependencyTree = (packages, mountPath) => {
	const pkgs = Object.keys(packages);

	const promises = pkgs.map((packageName) => {
		return new Promise((resolve, reject) => {
			const pkgDist = path.join(mountPath, packageName);
			const pkg = packages[packageName];
			const untarStream = tar.Extract({ path: pkgDist, strip: 1 });

			untarStream.on('error', reject);

			untarStream.on('end', () => {
				writeDependencyTree(pkg.dependencies, path.join(pkgDist, PGKS_LOCATION))
				.then(resolve);
			});

			request(pkg.tarball).pipe(zlib.createGunzip()).pipe(untarStream)
		});
	});

	return Promise.all(promises);
};


module.exports = (tree) => {
	return mkdir(PGK_DIR)
	.then(() => writeDependencyTree(tree, PGK_DIR))
}
