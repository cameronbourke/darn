const fs = require('fs');
const { PACKAGE_JSON_DIR } = require('./constants');


const packageJson = (fn, packages) => {
	return new Promise((resolve, reject) => {
		fs.readFile(PACKAGE_JSON_DIR, (err, data) => {
	  	if (err) return reject(err);

			const packageJSON = JSON.parse(data.toString('utf8'));
			if (!packageJSON.dependencies) packageJSON.dependencies = {};

			const updated = Object.keys(packages)
				.reduce((acc, k) => fn(acc, packages[k]), packageJSON);

			fs.writeFile(PACKAGE_JSON_DIR, JSON.stringify(updated, null, 2), (err) => {
				if (err) return reject(err);
				return resolve();
			});
		});
	});
};

const savePackage = packageJson.bind(null, (acc, package) => {
	acc.dependencies[package.name] = package.version;
	return acc;
});

const removePackage = packageJson.bind(null, (acc, package) => {
	delete acc.dependencies[package.name];
	return acc;
});


module.exports = {
	savePackage,
	removePackage,
};
