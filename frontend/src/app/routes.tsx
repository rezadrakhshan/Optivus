import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router';
import { PageSkeleton } from '@/components/common/PageSkeleton';
import { fa } from '@/i18n/fa';
import { AppLayout } from '@/layouts/AppLayout';
import type { RouteHandle } from '@/layouts/route-handle';
import { RouteErrorPage } from './pages/RouteErrorPage';

const handle = (title: string): RouteHandle => ({ title });

/**
 * Each page is a separate chunk, downloaded the first time it is visited.
 * `lazy` resolves to the page's default export.
 */
function page(load: () => Promise<{ default: ComponentType }>) {
  return async () => ({ Component: (await load()).default });
}

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    // Shown while the first page's code loads on a cold start.
    hydrateFallbackElement: (
      <div className="mx-auto max-w-[1440px] p-6">
        <PageSkeleton />
      </div>
    ),
    children: [
      {
        index: true,
        lazy: page(() => import('@/features/dashboard/pages/DashboardPage')),
        handle: handle(fa.nav.dashboard),
      },
      {
        path: 'leads',
        lazy: page(() => import('@/features/leads/pages/LeadsPage')),
        handle: handle(fa.nav.leads),
      },
      {
        path: 'categories',
        lazy: page(() => import('@/features/categories/pages/CategoriesPage')),
        handle: handle(fa.nav.categories),
      },
      {
        path: 'analytics',
        lazy: page(() => import('@/features/analytics/pages/AnalyticsPage')),
        handle: handle(fa.nav.analytics),
      },
      {
        path: 'activities',
        lazy: page(() => import('@/features/activities/UnavailablePage')),
        handle: handle(fa.nav.activities),
      },
      {
        path: 'profile',
        lazy: page(() => import('@/features/profile/pages/ProfilePage')),
        handle: handle(fa.nav.profile),
      },
      {
        path: '*',
        lazy: page(() => import('./pages/NotFoundPage')),
        handle: handle(fa.notFound.title),
      },
    ],
  },
];
