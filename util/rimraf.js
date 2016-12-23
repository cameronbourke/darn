const rimraf = (path) =>
	new Promise((resolve, reject) => {
		require('rimraf')(path, (err) => {
			if (err) return reject(err);
			return resolve(err);
		});
	});


module.exports = rimraf;
