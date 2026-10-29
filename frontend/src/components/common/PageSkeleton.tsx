import { fa } from '@/i18n/fa';
import { Skeleton } from '@/components/ui/skeleton';

/** Shown while a lazily loaded page's code is downloading. */
export function PageSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-6">
      <span className="sr-only">{fa.common.loading}</span>
      <Skeleton className="h-5 w-64 max-w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-72 rounded-xl" />
    </div>
  );
}
