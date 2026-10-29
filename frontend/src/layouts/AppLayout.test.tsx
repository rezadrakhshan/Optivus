import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Providers } from '@/app/Providers';
import { routes } from '@/app/routes';
import { setMediaQuery } from '@/test/setup';
import { SIDEBAR_STORAGE_KEY } from './use-sidebar';

const DESKTOP = '(min-width: 1024px)';

async function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>,
  );
  // Wait for the lazily loaded page to render its h1 title.
  await screen.findByRole('heading', { level: 1 });
  return router;
}

/** The sidebar navigation (the mobile drawer adds a second nav only when open). */
function sidebarNav() {
  return screen.getByRole('navigation', { name: 'ناوبری اصلی' });
}

describe('AppLayout', () => {
  it('shows the page title and marks the active navigation item', async () => {
    setMediaQuery(DESKTOP, true);
    await renderApp('/leads');

    expect(screen.getByRole('heading', { level: 1, name: 'سرنخ‌ها' })).toBeInTheDocument();
    expect(document.title).toBe('سرنخ‌ها | اپتیووس');
    const active = within(sidebarNav()).getByRole('link', { name: 'سرنخ‌ها' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(within(sidebarNav()).getByRole('link', { name: 'داشبورد' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('marks activities as coming soon and shows the unavailable state', async () => {
    setMediaQuery(DESKTOP, true);
    await renderApp('/activities');

    expect(within(sidebarNav()).getByText('به‌زودی')).toBeInTheDocument();
    expect(await screen.findByText('در دسترس نیست')).toBeInTheDocument();
  });

  it('collapses the desktop sidebar with the button and remembers it', async () => {
    setMediaQuery(DESKTOP, true);
    const user = userEvent.setup();
    await renderApp();

    await user.click(screen.getByRole('button', { name: 'جمع کردن نوار کناری' }));
    expect(screen.getByRole('button', { name: 'باز کردن نوار کناری' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe('true');
  });

  it('starts collapsed when that was saved', async () => {
    setMediaQuery(DESKTOP, true);
    localStorage.setItem(SIDEBAR_STORAGE_KEY, 'true');
    await renderApp();
    expect(screen.getByRole('button', { name: 'باز کردن نوار کناری' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    // Regression: links inside tooltip triggers keep their styles and active state.
    const active = within(sidebarNav()).getByRole('link', { name: 'داشبورد' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveClass('relative', 'bg-accent');
  });

  it('toggles the sidebar with Ctrl+B, but not while typing', async () => {
    setMediaQuery(DESKTOP, true);
    const user = userEvent.setup();
    await renderApp();

    await user.keyboard('{Control>}b{/Control}');
    expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe('true');

    const input = document.createElement('input');
    document.body.append(input);
    input.focus();
    await user.keyboard('{Control>}b{/Control}');
    expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe('true');
    input.remove();
  });

  it('uses an overlay on tablets that closes after navigating', async () => {
    setMediaQuery(DESKTOP, false);
    const user = userEvent.setup();
    const router = await renderApp();

    const toggle = screen.getByRole('button', { name: 'باز کردن نوار کناری' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(within(sidebarNav()).getByRole('link', { name: 'دسته‌بندی‌ها' }));
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/categories');
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Tablet state is temporary and never saved.
    expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBeNull();
  });

  it('opens the mobile drawer and closes it after choosing a page', async () => {
    const user = userEvent.setup();
    const router = await renderApp();

    const mobileButton = screen.getByRole('button', { name: 'باز کردن منو' });

    await user.click(mobileButton);
    const drawer = await screen.findByRole('dialog');
    await user.click(within(drawer).getByRole('link', { name: 'تحلیل‌ها' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/analytics');
    });
    await waitFor(() => {
      expect(mobileButton).toHaveFocus();
    });
  });

  it('shows the not-found page for unknown URLs', async () => {
    await renderApp('/no-such-page');
    expect(
      await screen.findByText('نشانی واردشده وجود ندارد یا جابه‌جا شده است.'),
    ).toBeInTheDocument();
  });
});
