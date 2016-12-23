const fs = require('fs');

const writeFile = (path, contents) =>
	new Promise((resolve, reject) => {
		fs.writeFile(path, JSON.stringify(contents, null, 2), (err) => {
			if (err) return reject(err);
			return resolve();
		});
	});


module.exports = writeFile;
