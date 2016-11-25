class FetchedVersions {
	constructor () {
		this._packages = {};
	}

	get (name) {
		return this._packages[name] || [];
	}

	set (name, version) {
		// should we throw here or just fail silently?
		if (name == null) throw new Error(`package name for version ${version} was undefined`);
		if (!this._packages[name]) this._packages[name] = [];
		this._packages[name].push(version);
	}

	clear () {
		this._packages = {};
	}
}

module.exports = FetchedVersions;
