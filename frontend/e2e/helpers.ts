import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

export type Theme = 'light' | 'dark';

/** Representative widths from the UI spec (height is a typical device height). */
export const viewports = [
  { name: 'mobile-360', width: 360, height: 780 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
] as const;

/** Saves a theme preference before any page script runs, like a returning user. */
export async function useTheme(page: Page, theme: Theme) {
  await page.addInitScript((value) => {
    localStorage.setItem('optivus.theme', value);
  }, theme);
}

/** Fails the test if the page can scroll sideways. */
export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(0);
}

/** Runs axe (WCAG 2.1 A/AA) and fails on serious or critical violations. */
export async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(
    serious.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`),
  ).toEqual([]);
}
