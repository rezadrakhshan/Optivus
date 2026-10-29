import { expect, test } from '@playwright/test';
import { useTheme } from './helpers';

test('saved dark theme is applied before the app script runs (no flash)', async ({ page }) => {
  await useTheme(page, 'dark');
  // Block the app bundle: only index.html and its inline theme script can run.
  await page.route('**/assets/*.js', (route) => route.abort());
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.style.colorScheme)).toBe('dark');
});

test('system preference is followed when nothing is saved', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('choosing a theme in the menu persists across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  await page.getByRole('button', { name: 'انتخاب پوسته' }).click();
  await page.getByRole('menuitemradio', { name: 'تیره' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => localStorage.getItem('optivus.theme'))).toBe('dark');

  await page.getByRole('button', { name: 'انتخاب پوسته' }).click();
  await page.getByRole('menuitemradio', { name: 'روشن' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});
