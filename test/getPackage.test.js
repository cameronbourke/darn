const assert = require('assert');
const getPackage = require('../lib/getPackage');

describe('getPackage', () => {

	it('works', (done) => {
			getPackage('lodash', '15.0.0')
			.then((res) => {
				assert.equal(res.name, 'react');
				assert.equal(res.version, '15.0.0');
				assert.ok(res.dependencies);
				done();
			})
			.catch((err) => console.log('err', err))
	});

});
