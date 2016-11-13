const fetch = require('node-fetch');
const { REGISTRY, PGK_NAME } = require('./constants');

const getFactory = (name, version) => {
	const url = `${REGISTRY}/${name}/${version}`;
	return fetch(url)
	.then((res) => res.json());
};


module.exports = getFactory;
