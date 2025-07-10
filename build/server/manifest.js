const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DeYOMkNe.js",app:"_app/immutable/entry/app.Cw7rUZaj.js",imports:["_app/immutable/entry/start.DeYOMkNe.js","_app/immutable/chunks/BH0Io0K6.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/entry/app.Cw7rUZaj.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/qvmD8DIL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DmdTaInW.js')),
			__memo(() => import('./chunks/1-Dh38qJof.js')),
			__memo(() => import('./chunks/2-IRCXmkjG.js')),
			__memo(() => import('./chunks/3-A8jUEUVj.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/matches",
				pattern: /^\/matches\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
