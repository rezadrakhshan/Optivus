import { createContext, useContext } from 'react';
import type { ResolvedTheme, ThemePreference } from './theme-storage';

export interface ThemeContextValue {
  /** What the user picked: light, dark, or follow the operating system. */
  preference: ThemePreference;
  /** The theme actually shown right now. */
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
