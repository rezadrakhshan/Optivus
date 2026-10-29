import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { PageSkeleton } from '@/components/common/PageSkeleton';
import { SkipLink } from '@/components/common/SkipLink';
import { usePageTitle } from './route-handle';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useSidebar } from './use-sidebar';

/** Shell for every signed-in page: sidebar, top bar and the page content. */
export function AppLayout() {
  const sidebar = useSidebar();
  const title = usePageTitle();

  return (
    <div className="flex min-h-dvh">
      <SkipLink />
      <Sidebar {...sidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 outline-none md:px-6 lg:px-8"
        >
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
