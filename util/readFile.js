const fs = require('fs');

const readFile = (path) =>
	new Promise((resolve, reject) => {
		fs.readFile(path, (err, contents) => {
			if (err) return reject(err);
			return resolve(JSON.parse(contents.toString('utf8')));
		});
	});


module.exports = readFile;
