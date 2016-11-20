const { GLOBAL, DEPENDENCY_TYPE } = require('../lib/constants');
const { read } = require('./packageJson');

const resolveInstallPackages = (packages = {}) => {
	if (GLOBAL || Object.keys(packages).length) return Promise.resolve(packages);
	return read().then((packageJson) => {
		return packageJson[DEPENDENCY_TYPE || 'dependencies'];
	});
}


module.exports = resolveInstallPackages;
