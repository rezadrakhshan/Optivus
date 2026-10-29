import { Construction } from 'lucide-react';
import { fa } from '@/i18n/fa';
import { EmptyState } from './EmptyState';
import { PageHeader } from './PageHeader';

/**
 * Temporary body for pages whose features arrive in a later milestone.
 * It shows no sample data.
 */
export function Placeholder({ description }: { description: string }) {
  return (
    <>
      <PageHeader description={description} />
      <EmptyState
        icon={Construction}
        title={fa.placeholder.title}
        description={fa.placeholder.description}
      />
    </>
  );
}
