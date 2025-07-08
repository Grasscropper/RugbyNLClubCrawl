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
		client: {start:"_app/immutable/entry/start.CvGzh91z.js",app:"_app/immutable/entry/app.CaOEKDDX.js",imports:["_app/immutable/entry/start.CvGzh91z.js","_app/immutable/chunks/36-zbK8S.js","_app/immutable/chunks/DZQqVVzz.js","_app/immutable/chunks/C9ZhiaAV.js","_app/immutable/chunks/CgdROTyy.js","_app/immutable/entry/app.CaOEKDDX.js","_app/immutable/chunks/C9ZhiaAV.js","_app/immutable/chunks/DZQqVVzz.js","_app/immutable/chunks/CgdROTyy.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BJ4INOJk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CPioEGdp.js')),
			__memo(() => import('./chunks/1-DTCt08ag.js')),
			__memo(() => import('./chunks/2-DZfxrl8M.js')),
			__memo(() => import('./chunks/3-XoD6Kg1Q.js'))
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
