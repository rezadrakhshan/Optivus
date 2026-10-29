import { fa } from '@/i18n/fa';
import { cn } from '@/lib/cn';

/** Logo mark plus product name; the name is hidden in the collapsed sidebar. */
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', compact && 'justify-center')}>
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className={cn('leading-tight', compact && 'sr-only')}>
        <span className="block text-base font-bold">{fa.app.name}</span>
        <span className="block text-xs text-muted-foreground">{fa.app.tagline}</span>
      </span>
    </div>
  );
}
