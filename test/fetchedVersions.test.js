const assert = require('assert');
const FetchedVersions = require('../lib/FetchedVersions');

const versions = new FetchedVersions();

describe('FetchedVersions', () => {

	beforeEach(function () { versions.clear() });

	it('sets packages to an empty object when clear is called', () => {
		versions.set('test-pkg-a', '2.3.0');
		versions.set('test-pkg-b', '1.2.1');
		versions.clear();
		assert.deepEqual(versions._packages, {});
	});

	it('returns an empty array when package has not been previously set', () => {
		assert.deepEqual(versions.get('lodash'), []);
	});

	it('returns an empty array when calling versions.get with undefined', () => {
		assert.deepEqual(versions.get(undefined), []);
	});

	it('sets a version number', () => {
		const version = '1.4.0';
		versions.set('lodash', version);
		assert.deepEqual(versions.get('lodash'), [version]);
	});

	it('accepts latest as a version number', () => {
		const version = 'latest';
		versions.set('lodash', version);
		assert.deepEqual(versions.get('lodash'), [version]);
	});

	it('adds an additional version number to the end of the array', () => {
		const vNumbers = ['1.0.0', '2.0.0', '3.0.0'];
		vNumbers.forEach((number) => versions.set('lodash', number));
		assert.deepEqual(versions.get('lodash'), vNumbers);
	});

	it('sets multiple package names', () => {
		const version = '4.2.1';
		const packages = ['react', 'test-pkg', 'react-select'];
		packages.forEach((name) => versions.set(name, version));
		packages.forEach((name) => assert.deepEqual(versions.get(name), [version]))
	});

	it('throws when setting an undefined package', () => {
		assert.throws(() => {
			versions.set(undefined, '2.3.2')
		});
	});

});
