#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const command = argv._[0];

const install = require('../commands/install');
const uninstall = require('../commands/uninstall');

const packages = argv._.splice(1).reduce((acc, v) => {
	[name, version = 'latest'] = v.split('@');
	acc[name] = version;
	return acc;
}, {});


switch (command) {
	case 'install':
	case 'i':
		return install(packages)
		.then(() => {
			console.log('[tinypm] install complete');
		})
		.catch((err) => {
			console.log('[tinypm] install err', err);
		});
	case 'uninstall':
	case 'un':
		uninstall(packages)
		.then(() => {
			console.log('[tinypm] uninstall complete');
		})
		.catch((err) => {
			console.log('[tinypm] uninstall err', err);
		});
		break;
}
