let packages = {};

const get = (name) => {
	const packageVers = packages[name];
	if (packageVers) return packageVers;
	return [];
};

const set = (name, version) => {
	if (name == null) throw Error(`package name for the version ${version} was undefined`);
	if (!packages[name]) packages[name] = [];
	packages[name].push(version);
};

const clear = () => {
	packages = {};
};

module.exports = {
	set,
	get,
	clear,
};
