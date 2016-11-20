const assert = require('assert');
const { get, set, clear } = require('../lib/fetchedVersions');

describe('fetchedVersions', () => {

	beforeEach(clear);

	it('returns an empty array when package has not been previously set', () => {
		assert.deepEqual(get('lodash'), []);
	});

	it('returns an empty array when calling get with undefined', () => {
		assert.deepEqual(get(undefined), []);
	});

	it('sets a version number', () => {
		const version = '1.4.0';
		set('lodash', version);
		assert.deepEqual(get('lodash'), [version]);
	});

	it('accepts latest as a version number', () => {
		const version = 'latest';
		set('lodash', version);
		assert.deepEqual(get('lodash'), [version]);
	});

	it('adds an additional version number to the end of the array', () => {
		const versions = ['1.0.0', '2.0.0', '3.0.0'];
		versions.forEach((number) => set('lodash', number));
		assert.deepEqual(get('lodash'), versions);
	});

	it('sets multiple package names', () => {
		const version = '4.2.1';
		const packages = ['react', 'test-pkg', 'react-select'];
		packages.forEach((name) => set(name, version));
		packages.forEach((name) => assert.deepEqual(get(name), [version]))
	});

	it('throws when setting an undefined package', () => {
		assert.throws(set(undefined, '2.3.2'));
	});

});
