#!/usr/bin/env node

const { PACKAGES } = '../lib/constants';
const command = process.argv[2];

const install = require('../commands/install');
const uninstall = require('../commands/uninstall');

const packages = process.argv.slice(3).reduce((acc, v) => {
	if (v.charAt(0) === '-') return acc;
	[name, version = 'latest'] = v.split('@');
	acc[name] = version;
	return acc;
}, {});

switch (command) {
	case 'install':
	case 'i':
		console.log('[tinypm] installing packages...');
		return install(packages)
		.then(() => {
			console.log('[tinypm] install complete');
		})
		.catch((err) => {
			console.error('[tinypm] install err', err.message);
		});
	case 'uninstall':
	case 'un':
		console.log('[tinypm] uninstalling packages...');
		return uninstall(packages)
		.then(() => {
			console.log('[tinypm] uninstall complete');
		})
		.catch((err) => {
			console.error('[tinypm] uninstall err', err.message);
		});
	default:
		console.log('[tinypm] command not found');
}
