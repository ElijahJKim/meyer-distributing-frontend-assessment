import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.fk9PfKUJ.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/D2DjWX1i.js","_app/immutable/chunks/BHE0670d.js","_app/immutable/chunks/C9nHjGc9.js","_app/immutable/chunks/Cg7UM1WU.js","_app/immutable/chunks/DTz821JP.js","_app/immutable/chunks/PfidaW42.js","_app/immutable/chunks/BK0x6dqc.js","_app/immutable/chunks/BJnzhIeR.js"];
export const stylesheets = ["_app/immutable/assets/2.BNe0f_hF.css"];
export const fonts = [];
