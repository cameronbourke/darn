const packages = {};

const get = (name) => {
	const packageVers = packages[name];
	if (packageVers) return packageVers;
	return [];
};

const set = (name, version) => {
	if (!packages[name]) packages[name] = [];
	packages[name].push(version);
};


module.exports = {
	set,
	get,
};
