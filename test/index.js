const path = require('path');
const Mocha = require('mocha');

const mocha = new Mocha({ growl: true });

// mocha.addFile(path.join(__dirname, 'testHelper.js'));
mocha.addFile(path.join(__dirname, 'FetchedVersions.test.js'));

mocha.run(function (failures) {
	process.on('exit', function () {
		console.log('failures:', failures);
		process.exit(failures);
	});

	process.exit();
});
