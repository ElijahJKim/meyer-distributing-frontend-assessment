import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BWsaIdUX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/D2DjWX1i.js","_app/immutable/chunks/DTz821JP.js","_app/immutable/chunks/C9nHjGc9.js","_app/immutable/chunks/Cg7UM1WU.js"];
export const stylesheets = ["_app/immutable/assets/0.5NTr6Jio.css"];
export const fonts = [];
