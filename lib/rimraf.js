const rimraf = require('rimraf');

const _rimraf = (path) => new Promise((resolve, reject) => {
	rimraf(path, (err) => {
		if (err) return reject(err);
		return resolve(err);
	});
});


module.exports = _rimraf;
