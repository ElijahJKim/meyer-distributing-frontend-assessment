import {
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  type Theme,
} from "$lib/utils/theme";

class ThemeStore {
  value = $state<Theme>("light");

  get isDark(): boolean {
    return this.value === "dark";
  }

  init(next: Theme): void {
    this.value = next;
  }

  set(next: Theme): void {
    this.value = next;
    this.writeCookie(next);
  }

  writeCookie(next: Theme): void {
    if (typeof document === "undefined") {
      return;
    }

    document.cookie = `${THEME_COOKIE_NAME}=${next}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

export const themeStore = new ThemeStore();
