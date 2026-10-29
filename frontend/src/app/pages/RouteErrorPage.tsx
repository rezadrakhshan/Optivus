import { RotateCw, TriangleAlert } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { fa } from '@/i18n/fa';

/** Shown when a page crashes while rendering or fails to load its code. */
export function RouteErrorPage() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <EmptyState
        icon={TriangleAlert}
        tone="warning"
        title={fa.error.title}
        description={fa.error.description}
        action={
          <Button
            variant="secondary"
            onClick={() => {
              window.location.reload();
            }}
          >
            <RotateCw aria-hidden="true" />
            {fa.error.retry}
          </Button>
        }
      />
    </div>
  );
}
