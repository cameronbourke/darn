const fetch = require('node-fetch');

const { REGISTRY, PGK_NAME } = require('./constants');


const getPackageFactory = (cache = {}) => (name, version) => {
	const url = `${REGISTRY}/${name}/${version}`;
	if (cache[url]) return Promise.resolve(cache[url]);
	return fetch(url)
	.then((res) => res.json())
	.then((pkg) => (cache[url] = pkg));
}

module.exports = getPackageFactory();
