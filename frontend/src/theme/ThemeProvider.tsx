import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { useMediaQuery } from '@/lib/use-media-query';
import { ThemeContext, type ThemeContextValue } from './theme-context';
import {
  applyTheme,
  readThemePreference,
  resolveTheme,
  writeThemePreference,
  type ThemePreference,
} from './theme-storage';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readThemePreference);
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const resolved = resolveTheme(preference, systemDark);

  // Layout effect so the class changes in the same frame as the re-render.
  useLayoutEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setPreference = useCallback((next: ThemePreference) => {
    writeThemePreference(next);
    setPreferenceState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
