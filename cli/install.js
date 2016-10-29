const dependencyTree = require('../lib/tree');
const writeTree = require('../lib/write');


const initDeps = process.argv.splice(2).reduce((acc, v) => {
	[name, version = 'latest'] = v.split('@');
	acc[name] = version;
	return acc;
}, {});


dependencyTree(initDeps)
.then((tree) => {
	console.log(
		'[farn] tree',
		JSON.stringify(tree, null, 2)
	);
	return writeTree(tree);
})
.then(() => {
	console.info('[farn] install complete');
});
