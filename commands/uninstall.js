const rimraf = require('../util/rimraf');
const { removePackage } = require('../lib/packageJson');
const { PGK_DIR, GLOBAL, DEPENDENCY_TYPE } = require('../lib/constants');

const uninstall = (packages) => {
	const promises = Object.keys(packages)
	.map((name) => rimraf(`${PGK_DIR}/${name}`));
	return Promise.all(promises);
};


module.exports = (packages) => {
	const remove = uninstall(packages);
	if (GLOBAL && !DEPENDENCY_TYPE) return remove;
	return remove.then(() => removePackage(packages));	
};
