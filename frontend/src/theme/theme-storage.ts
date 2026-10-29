/**
 * Theme preference persistence.
 * The inline script in index.html applies the same rules before React loads;
 * keep THEME_STORAGE_KEY and resolveTheme() in sync with it.
 */
import { readStorage, writeStorage } from '@/lib/storage';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'optivus.theme';

export function readThemePreference(): ThemePreference {
  const value = readStorage(THEME_STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function writeThemePreference(preference: ThemePreference): void {
  writeStorage(THEME_STORAGE_KEY, preference);
}

export function resolveTheme(preference: ThemePreference, systemDark: boolean): ResolvedTheme {
  if (preference === 'system') return systemDark ? 'dark' : 'light';
  return preference;
}

export function applyTheme(theme: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}
