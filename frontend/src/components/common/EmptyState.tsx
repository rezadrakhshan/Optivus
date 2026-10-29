import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Optional primary action, such as a "create" button. */
  action?: ReactNode;
  /** Visual tone of the icon badge. */
  tone?: 'default' | 'warning';
  className?: string;
}

/** Icon, one sentence and an optional action: used for empty, unavailable and not-found states. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  tone = 'default',
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed bg-surface px-6 py-14 text-center',
        className,
      )}
    >
      <span
        className={cn(
          'mb-4 inline-flex size-12 items-center justify-center rounded-full',
          tone === 'warning' ? 'bg-warning/15 text-warning' : 'bg-accent text-accent-foreground',
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h2 className="text-base font-semibold">{title}</h2>
      {description && (
        <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}
