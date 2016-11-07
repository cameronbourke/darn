const rimraf = require('../lib/rimraf');
const { removePackage } = require('../lib/packageJson');
const { PGK_DIR } = require('../lib/constants');

const uninstall = (packages, save) => {
	const promises = Object.keys(packages).map((name) => rimraf(`${PGK_DIR}/${name}`));
	return Promise.all(promises).then(() => packages);
};


module.exports = (packages) => {
	return uninstall(packages).then(removePackage);
};
