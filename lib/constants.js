const path = require('path');

const cwd = process.cwd();
const PGKS_LOCATION = 'node_modules';

module.exports = {
	REGISTRY: 'http://registry.npmjs.org',
	PGKS_LOCATION,
	PGK_DIR: path.join(cwd, PGKS_LOCATION),
	PACKAGE_JSON_DIR: path.join(cwd, 'package.json'),
};
