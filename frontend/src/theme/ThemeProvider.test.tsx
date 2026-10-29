import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { setMediaQuery } from '@/test/setup';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';
import { readThemePreference, resolveTheme, THEME_STORAGE_KEY } from './theme-storage';

const DARK_QUERY = '(prefers-color-scheme: dark)';
const root = document.documentElement;

function renderToggle() {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

async function choose(label: string) {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'انتخاب پوسته' }));
  await user.click(await screen.findByRole('menuitemradio', { name: label }));
}

describe('theme storage', () => {
  it('defaults to system for missing or invalid values', () => {
    expect(readThemePreference()).toBe('system');
    localStorage.setItem(THEME_STORAGE_KEY, 'purple');
    expect(readThemePreference()).toBe('system');
  });

  it('resolves system preference from the OS setting', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
  });
});

describe('ThemeProvider + ThemeToggle', () => {
  it('applies and persists the dark theme', async () => {
    renderToggle();
    expect(root).not.toHaveClass('dark');

    await choose('تیره');

    expect(root).toHaveClass('dark');
    expect(root.style.colorScheme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('restores a saved light theme even when the OS prefers dark', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    setMediaQuery(DARK_QUERY, true);
    renderToggle();
    expect(root).not.toHaveClass('dark');
  });

  it('follows OS changes while set to system', async () => {
    renderToggle();
    await choose('هماهنگ با سیستم');
    expect(root).not.toHaveClass('dark');

    act(() => {
      setMediaQuery(DARK_QUERY, true);
    });
    expect(root).toHaveClass('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('system');
  });
});
