/**
 * localStorage wrappers that never throw. Storage can be unavailable
 * (private mode, blocked site data), and the UI must keep working without it.
 */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore: the value just won't persist across reloads.
  }
}
