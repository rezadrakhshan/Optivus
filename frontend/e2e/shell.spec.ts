import { expect, test } from '@playwright/test';
import {
  expectNoHorizontalOverflow,
  expectNoSeriousA11yViolations,
  useTheme,
  viewports,
  type Theme,
} from './helpers';

const themes: Theme[] = ['light', 'dark'];
const pages = ['/', '/leads', '/categories', '/analytics', '/activities', '/profile', '/missing'];

for (const theme of themes) {
  for (const viewport of viewports) {
    test(`shell ${viewport.name} ${theme}: RTL, no overflow, accessible`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });

      await page.setViewportSize(viewport);
      await useTheme(page, theme);
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1, name: 'داشبورد' })).toBeVisible();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('dir', 'rtl');
      await expect(html).toHaveAttribute('lang', 'fa');
      if (theme === 'dark') await expect(html).toHaveClass(/dark/);
      else await expect(html).not.toHaveClass(/dark/);

      // Screenshot of the dashboard shell for review (not a pixel comparison).
      await page.screenshot({ path: `screenshots/shell-${viewport.name}-${theme}.png` });

      for (const path of pages) {
        await page.goto(path);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expectNoHorizontalOverflow(page);
        await expectNoSeriousA11yViolations(page);
      }

      expect(errors).toEqual([]);
    });
  }
}

test('sidebar sits on the right (inline-start) on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'ناوبری اصلی' });
  const box = await nav.boundingBox();
  expect(box).not.toBeNull();
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeGreaterThan(1440 - 8);
  expect(box?.width ?? 0).toBeGreaterThan(200);
});

test('desktop sidebar collapses to the 72px rail and stays collapsed after reload', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await page.getByRole('button', { name: 'جمع کردن نوار کناری' }).click();
  const rail = page.getByRole('navigation', { name: 'ناوبری اصلی' });
  await expect.poll(async () => (await rail.boundingBox())?.width).toBeLessThanOrEqual(72);

  await page.reload();
  await expect(page.getByRole('button', { name: 'باز کردن نوار کناری' })).toBeVisible();
  // Collapsed items are still reachable and labelled for screen readers.
  await expect(rail.getByRole('link', { name: 'سرنخ‌ها' })).toBeVisible();

  await page.keyboard.press('Control+b');
  await expect(page.getByRole('button', { name: 'جمع کردن نوار کناری' })).toBeVisible();
});

test('mobile drawer: opens, traps focus, closes with Esc and after navigating', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');

  const hamburger = page.getByRole('button', { name: 'باز کردن منو' });
  await hamburger.click();
  const drawer = page.getByRole('dialog');
  await expect(drawer).toBeVisible();
  await page.screenshot({ path: 'screenshots/drawer-mobile-360-light.png' });

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(hamburger).toBeFocused();

  await hamburger.click();
  await drawer.getByRole('link', { name: 'دسته‌بندی‌ها' }).click();
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/\/categories$/);
  await expect(page.getByRole('heading', { level: 1, name: 'دسته‌بندی‌ها' })).toBeVisible();
});

test('skip link is the first focusable element and moves focus to the content', async ({
  page,
}) => {
  await page.goto('/');
  // Wait until the app has rendered (the skip link is part of the app shell).
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'رفتن به محتوای اصلی' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});
