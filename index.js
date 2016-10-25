const fs = require('fs');
const request = require('request');
const targz = require('tar.gz');
const R = require('ramda');

const REGISTRY = 'http://registry.npmjs.org';
const PGKS_LOCATION = 'modules';
const PGK_NAME = 'react';
const PGK_DIR = __dirname + '/' + PGKS_LOCATION + '/' + PGK_NAME;

// Streams
const read = request.get(`${REGISTRY}/${PGK_NAME}/-/${PGK_NAME}-15.3.2.tgz`);
const parse = targz().createParseStream();

// create a folder called modules in the root directory

fs.exists(PGK_DIR, (exists) => {
  if (!exists) {
		fs.mkdir(PGK_DIR, () => {
			fs.mkdir(PGK_DIR + '/lib');
			fs.mkdir(PGK_DIR + '/dist');
		});
	}

	parse.on('entry', (entry) => {
		const ws = fs.createWriteStream(entry.path.replace('package', PGK_DIR));
		let data = '';
		entry.on('data', (chunk) => {
			// need to address this issue
			// https://blog.continuation.io/converting-buffer-chunks-into-strings/
			data += chunk.toString('utf8');
		});
		entry.on('end', () => {
			ws.write(data);
		});
	});

	read.pipe(parse);
});
