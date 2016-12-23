const { GLOBAL, DEPENDENCY_TYPE } = require('../lib/constants');
const dependencyTree = require('../lib/dependencyTree');
const writeDependencyTree = require('../lib/writeDependencyTree');
const { savePackage } = require('../lib/packageJson');


module.exports = (packages) => {
	const install = dependencyTree(packages)
	.then(writeDependencyTree);

	if (GLOBAL && !DEPENDENCY_TYPE) return install;
	return install.then(() => savePackage(packages));
}
