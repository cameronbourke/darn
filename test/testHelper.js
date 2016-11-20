const nockBack = require('nock').back;
const path = require('path');
const http = require('http');

nockBack.setMode('lockdown');
nockBack.fixtures = path.join(__dirname, 'nockFixtures'); //this only needs to be set once in your test helper

// before(function (done) {
// 	// recording of the fixture
// 	nockBack('npmLodashPackage.json', function (nockDone) {
// 	  http.get('http://registry.npmjs.org/react/15.0.0', function (res) {
// 			nockDone();
// 			done();
// 		});
// 	});
// });
