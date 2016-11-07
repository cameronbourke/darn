const dependencyTree = require('../lib/dependencyTree');
const writeTree = require('../lib/writeDependencyTree');
const { savePackage } = require('../lib/packageJson');


module.exports = (packages, save) => {
	return dependencyTree(packages)
	.then(writeTree)
	.then(savePackage);
}
