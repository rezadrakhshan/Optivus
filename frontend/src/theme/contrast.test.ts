/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Reads the light (:root) and dark (.dark) token blocks from globals.css and
 * checks the WCAG 2.1 contrast ratio of every foreground/background pair the UI uses.
 */
// CSS imports are stubbed in Vitest, so read the file. Vitest runs from the frontend folder.
const css = readFileSync(resolve(process.cwd(), 'src/styles/globals.css'), 'utf8');

function readTokens(selector: ':root' | '.dark'): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf('}', start));
  const tokens: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6});/g)) {
    if (name && value) tokens[name] = value;
  }
  return tokens;
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r = 0, g = 0, b = 0] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** [foreground token, background token, minimum ratio] */
const pairs: [string, string, number][] = [
  // Body and secondary text: 4.5:1
  ['foreground', 'background', 4.5],
  ['foreground', 'surface', 4.5],
  ['foreground', 'surface-raised', 4.5],
  ['foreground', 'surface-hover', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['muted-foreground', 'surface', 4.5],
  ['muted-foreground', 'surface-raised', 4.5],
  ['muted-foreground', 'surface-hover', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['primary-foreground', 'primary-hover', 4.5],
  ['accent-foreground', 'accent', 4.5],
  ['accent-foreground', 'surface-raised', 4.5],
  // Status colours are used as small text (badges) on surfaces: 4.5:1
  ['success', 'surface', 4.5],
  ['danger', 'surface', 4.5],
  ['warning', 'surface', 4.5],
  ['info', 'surface', 4.5],
  ['warning', 'background', 4.5],
  // The «به‌زودی» nav badge sits on the active-item background too.
  ['warning', 'accent', 4.5],
  // Focus ring, form-field borders and active indicators: 3:1 (WCAG 1.4.11)
  ['ring', 'background', 3],
  ['ring', 'surface', 3],
  ['ring', 'surface-raised', 3],
  ['input', 'surface', 3],
  ['input', 'surface-raised', 3],
];

describe.each([
  ['light', readTokens(':root')],
  ['dark', readTokens('.dark')],
] as const)('%s theme contrast', (_theme, tokens) => {
  it.each(pairs)('%s on %s ≥ %d:1', (fg, bg, min) => {
    const fgValue = tokens[fg];
    const bgValue = tokens[bg];
    expect(fgValue, `missing token --${fg}`).toBeDefined();
    expect(bgValue, `missing token --${bg}`).toBeDefined();
    expect(contrast(fgValue ?? '', bgValue ?? '')).toBeGreaterThanOrEqual(min);
  });
});
