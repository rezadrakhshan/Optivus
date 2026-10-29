import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

/**
 * jsdom has no matchMedia. This stub lets tests choose which media queries match
 * (for example the desktop breakpoint or a dark OS theme) and fire change events.
 */
type Listener = (event: MediaQueryListEvent) => void;
const matching = new Set<string>();
const listeners = new Map<string, Set<Listener>>();

export function setMediaQuery(query: string, matches: boolean) {
  if (matches) matching.add(query);
  else matching.delete(query);
  for (const listener of listeners.get(query) ?? []) {
    listener({ matches, media: query } as MediaQueryListEvent);
  }
}

window.matchMedia = (query: string): MediaQueryList =>
  ({
    media: query,
    get matches() {
      return matching.has(query);
    },
    onchange: null,
    addEventListener: (_type: string, listener: Listener) => {
      const set = listeners.get(query) ?? new Set<Listener>();
      set.add(listener);
      listeners.set(query, set);
    },
    removeEventListener: (_type: string, listener: Listener) => {
      listeners.get(query)?.delete(listener);
    },
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

beforeEach(() => {
  localStorage.clear();
  matching.clear();
  document.documentElement.className = '';
  document.documentElement.style.colorScheme = '';
});

afterEach(() => {
  cleanup();
});
