const readFile = require('../util/readFile');
const writeFile = require('../util/writeFile');
const { PACKAGE_JSON_DIR, DEPENDENCY_TYPE } = require('./constants');

const savePackage = (installedPackages) => {
	return readFile(PACKAGE_JSON_DIR)
	.then((packageJson) => {
		if (!packageJson[DEPENDENCY_TYPE]) packageJson[DEPENDENCY_TYPE] = {};

		// side effects
		Object.keys(installedPackages).forEach((name) => {
			packageJson[DEPENDENCY_TYPE][name] = installedPackages[name];
		});

		return writeFile(PACKAGE_JSON_DIR, packageJson);
	});
}

const removePackage = (removedPackages) => {
	return readFile(PACKAGE_JSON_DIR)
	.then((packageJson) => {
		const projectDeps = packageJson[DEPENDENCY_TYPE];
		if (!projectDeps) packageJson[DEPENDENCY_TYPE] = {};

		// side effects
		Object.keys(removedPackages).forEach((name) => {
			delete packageJson[DEPENDENCY_TYPE][name];
		});

		return writeFile(PACKAGE_JSON_DIR, packageJson);
	});
}


module.exports = { savePackage, removePackage };
