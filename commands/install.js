const { GLOBAL, DEPENDENCY_TYPE } = require('../lib/constants');
const dependencyTree = require('../lib/dependencyTree');
const writeTree = require('../lib/writeDependencyTree');
const { savePackage } = require('../lib/packageJson');


module.exports = (packages) => {
	const write = dependencyTree(packages).then(writeTree);
	if (!GLOBAL && DEPENDENCY_TYPE) return write.then(savePackage);
	return write;
}
