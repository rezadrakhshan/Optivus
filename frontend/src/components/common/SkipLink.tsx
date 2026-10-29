import { fa } from '@/i18n/fa';

/** First focusable element on every page: jumps keyboard users past the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-2 right-2 z-[60] -translate-y-20 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
    >
      {fa.app.skipToContent}
    </a>
  );
}
