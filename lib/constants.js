const path = require('path');

const cwd = process.cwd();
const GLOBAL_LOCATION = '/usr/local/lib';
const PGKS_LOCATION = 'node_modules';

const options = process.argv.slice(3).reduce((acc, v) => {
	if (v ==='-g' || v === '--global') return acc.add('global');
	if (v === '-S' || v === '--save') return acc.add('save');
	if (v === '-D' || v === '--save-dev') return acc.add('saveDev');
	return acc;
}, new Set());


module.exports = {
	REGISTRY: 'http://registry.npmjs.org',
	PACKAGE_JSON_DIR: path.join(cwd, 'package.json'),
	PGKS_LOCATION,
	PGK_DIR: path.join(options.has('global') ? GLOBAL_LOCATION : cwd, PGKS_LOCATION),
	DEPENDENCY_TYPE: options.has('save') && 'dependencies' || options.has('saveDev') && 'devDependencies',
	GLOBAL: options.has('global'),
};
