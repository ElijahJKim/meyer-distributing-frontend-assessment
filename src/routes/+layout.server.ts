import { parseTheme, THEME_COOKIE_NAME } from "$lib/utils/theme";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    theme: parseTheme(cookies.get(THEME_COOKIE_NAME)),
  };
};
