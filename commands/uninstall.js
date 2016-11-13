const rimraf = require('../util/rimraf');
const { removePackage } = require('../lib/packageJson');
const { PGK_DIR, GLOBAL, DEPENDENCY_TYPE } = require('../lib/constants');

const uninstall = (packages) => {
	const promises = Object.keys(packages).map((name) => rimraf(`${PGK_DIR}/${name}`));
	return Promise.all(promises).then(() => packages);
};


module.exports = (packages) => {
	const rm = uninstall(packages);
	if (!GLOBAL && DEPENDENCY_TYPE) return rm.then(removePackage);
	return rm;
};
