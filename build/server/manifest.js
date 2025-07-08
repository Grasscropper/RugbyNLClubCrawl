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
		client: {start:"_app/immutable/entry/start.CPDt0Eej.js",app:"_app/immutable/entry/app.DHqL5mZl.js",imports:["_app/immutable/entry/start.CPDt0Eej.js","_app/immutable/chunks/Cu_GpXFg.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/entry/app.DHqL5mZl.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/qvmD8DIL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DmdTaInW.js')),
			__memo(() => import('./chunks/1-C1QYTY8h.js')),
			__memo(() => import('./chunks/2-IRCXmkjG.js')),
			__memo(() => import('./chunks/3-BTe97vXr.js'))
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
				id: "/matches/[search]",
				pattern: /^\/matches\/([^/]+?)\/?$/,
				params: [{"name":"search","optional":false,"rest":false,"chained":false}],
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
