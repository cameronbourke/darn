const fetch = require('node-fetch');
const { REGISTRY, PGK_NAME } = require('./constants');

const getPackage = (name, version) => {
	const url = `${REGISTRY}/${name}/${version}`;
	return fetch(url)
	.then((res) => res.json());
};


module.exports = getPackage;
