const rimraf = require('rimraf');

rimraf(__dirname + '/../' + 'test_modules', () => {
	console.log('[farn] remove complete');
});
