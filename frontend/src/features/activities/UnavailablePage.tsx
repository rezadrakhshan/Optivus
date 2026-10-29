import { PageHeader } from '@/components/common/PageHeader';
import { Unavailable } from '@/components/common/Unavailable';
import { fa } from '@/i18n/fa';

/**
 * The backend records lead activities but has no endpoint to read them,
 * so this page only explains that. It makes no network requests.
 */
export default function UnavailablePage() {
  return (
    <>
      <PageHeader description={fa.pages.activitiesDescription} />
      <Unavailable reason={fa.unavailable.activities} />
    </>
  );
}
