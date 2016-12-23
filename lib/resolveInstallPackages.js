const { GLOBAL, DEPENDENCY_TYPE, PACKAGE_JSON_DIR } = require('../lib/constants');
const readFile = require('../util/readFile');

const resolveInstallPackages = (packages = {}) => {
	if (GLOBAL || Object.keys(packages).length) return Promise.resolve(packages);
	return readFile(PACKAGE_JSON_DIR)
	.then((packageJson) => {
		return packageJson[DEPENDENCY_TYPE || 'dependencies'];
	});
}


module.exports = resolveInstallPackages;
