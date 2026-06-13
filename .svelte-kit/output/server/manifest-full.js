export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["eee2603e-79af-44c7-be56-d1808b4e72a8.png","favicon.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BSHlXTN1.js",app:"_app/immutable/entry/app.DEoRoyYs.js",imports:["_app/immutable/entry/start.BSHlXTN1.js","_app/immutable/chunks/BK0x6dqc.js","_app/immutable/chunks/BHE0670d.js","_app/immutable/chunks/D2DjWX1i.js","_app/immutable/entry/app.DEoRoyYs.js","_app/immutable/chunks/D2DjWX1i.js","_app/immutable/chunks/BHE0670d.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/PfidaW42.js","_app/immutable/chunks/C9nHjGc9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
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
