import { Compass } from 'lucide-react';
import { Link } from 'react-router';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { fa } from '@/i18n/fa';

export default function NotFoundPage() {
  return (
    <EmptyState
      icon={Compass}
      title={fa.notFound.title}
      description={fa.notFound.description}
      action={
        <Button asChild>
          <Link to="/">{fa.notFound.backHome}</Link>
        </Button>
      }
    />
  );
}
