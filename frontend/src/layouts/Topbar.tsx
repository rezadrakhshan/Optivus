import { ThemeToggle } from '@/theme/ThemeToggle';
import { AccountMenu } from './AccountMenu';
import { MobileNav } from './MobileNav';

/** Sticky top bar: mobile menu, page title (the page's h1), theme and account menus. */
export function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2 px-2 md:h-16 md:px-6 lg:px-8">
        <MobileNav />
        <h1 className="min-w-0 flex-1 truncate px-1 text-lg font-semibold md:px-0 md:text-xl">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
