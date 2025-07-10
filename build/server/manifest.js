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
		client: {start:"_app/immutable/entry/start.CStAr5qY.js",app:"_app/immutable/entry/app.BS-Sxwoj.js",imports:["_app/immutable/entry/start.CStAr5qY.js","_app/immutable/chunks/BMbNBGKi.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/entry/app.BS-Sxwoj.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/qvmD8DIL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DmdTaInW.js')),
			__memo(() => import('./chunks/1-CbN7Drqx.js')),
			__memo(() => import('./chunks/2-IRCXmkjG.js')),
			__memo(() => import('./chunks/3-CH_pXavN.js'))
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
