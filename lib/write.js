const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const targz = require('tar.gz');
const R = require('ramda');

const PGKS_LOCATION = 'test_modules';
const PGK_DIR = __dirname + '/../' + PGKS_LOCATION;

const write = (tree, mountPath) => {
	Object.keys(tree).forEach((packageName) => {
		const pkg = tree[packageName];
		const read = request.get(pkg.tarball);
		const parse = targz().createParseStream();

		const pkgDist = mountPath + '/' + packageName;
		parse.on('entry', (entry) => {
			const wPath = entry.path.replace('package', pkgDist);
			// console.log('wPath', wPath);
			mkdirp(path.dirname(wPath), (err) => {
				const ws = fs.createWriteStream(wPath);
				let data = '';
				entry.on('data', (chunk) => {
					// need to address this issue
					// https://blog.continuation.io/converting-buffer-chunks-into-strings/
					data += chunk.toString('utf8');
				});
				entry.on('end', () => {
					// console.log('data', data);
					ws.write(data, (err) => {
						if (err) console.log('err', err);
					});
				});
			});
		});

		// work out how to determine when a complete package has been written
		parse.on('finish', () => {
			write(pkg.dependencies, pkgDist + '/' + PGKS_LOCATION);
		});

		parse.on('error', (err) => {
			console.log('[farn] write err', err);
		});

		read.pipe(parse);
	});
};

module.exports = (tree) => {
	// will simply ignore if folder is already created
	return mkdirp(PGK_DIR, (err) => {
		write(tree, PGK_DIR);
	});
};
