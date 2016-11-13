const fs = require('fs');
const { PACKAGE_JSON_DIR, DEPENDENCY_TYPE } = require('./constants');

const _update = (fn) => (packages) => {
	return read().then((packageJson) => {
		if (!packageJson[DEPENDENCY_TYPE]) packageJson[DEPENDENCY_TYPE] = {};

		Object.keys(packages)
			.forEach((k) => fn(k, packages[k], packageJson[DEPENDENCY_TYPE]));

		return write(packageJson);
	});
};

const read = () => new Promise((resolve, reject) => {
	fs.readFile(PACKAGE_JSON_DIR, (err, data) => {
		if (err) return reject(err);
		return resolve(JSON.parse(data.toString('utf8')));
	});
});

const write = (data) => new Promise((resolve, reject) => {
	fs.writeFile(PACKAGE_JSON_DIR, JSON.stringify(data, null, 2), (err) => {
		if (err) return reject(err);
		return resolve();
	});
});

const savePackage = _update((name, package, dependencies) => {
	dependencies[package.name] = package.version;
});

const removePackage = _update((name, package, dependencies) => {
	delete dependencies[name];
});


module.exports = {
	savePackage,
	removePackage,
	read,
	write,
};
