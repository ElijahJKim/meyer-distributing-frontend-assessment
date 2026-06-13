import type { Handle } from "@sveltejs/kit";
import { parseTheme, THEME_COOKIE_NAME } from "$lib/utils/theme";

export const handle: Handle = async ({ event, resolve }) => {
  const theme = parseTheme(event.cookies.get(THEME_COOKIE_NAME));

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%theme%", theme),
  });
};
