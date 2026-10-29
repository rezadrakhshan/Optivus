import { Hourglass } from 'lucide-react';
import { fa } from '@/i18n/fa';
import { EmptyState } from './EmptyState';

/**
 * Marks a feature the backend does not support yet.
 * It never shows sample data and never makes network requests.
 */
export function Unavailable({ reason, className }: { reason: string; className?: string }) {
  return (
    <EmptyState
      icon={Hourglass}
      tone="warning"
      title={fa.unavailable.title}
      description={reason}
      className={className}
    />
  );
}
