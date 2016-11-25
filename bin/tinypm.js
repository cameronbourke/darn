#!/usr/bin/env node

const resolveInstallPackages = require('../lib/resolveInstallPackages');
const install = require('../commands/install');
const uninstall = require('../commands/uninstall');

const command = process.argv[2];

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
		return resolveInstallPackages(packages)
			.then(install)
			.then(() => {
				console.log('[tinypm] install complete');
			})
			.catch((err) => {
				console.error('[tinypm] install err', err);
			});
	case 'uninstall':
	case 'un':
		console.log('[tinypm] uninstalling packages...');
		return uninstall(packages)
			.then(() => {
				console.log('[tinypm] uninstall complete');
			})
			.catch((err) => {
				console.error('[tinypm] uninstall err', err);
			});
	default:
		console.log('[tinypm] command not found');
}
