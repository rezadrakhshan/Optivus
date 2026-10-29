import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { fa } from '@/i18n/fa';
import { Brand } from './Brand';
import { SidebarNav } from './SidebarNav';

/**
 * Below 768px: hamburger button plus a right-side drawer. The drawer closes after
 * navigating, on Esc or on an overlay tap, and focus returns to the hamburger.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={fa.nav.openMenu}>
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={fa.nav.closeMenu}>
        <div className="flex h-16 shrink-0 items-center border-b ps-4 pe-16">
          <Brand />
        </div>
        <SheetTitle className="sr-only">{fa.nav.label}</SheetTitle>
        <SheetDescription className="sr-only">{fa.app.tagline}</SheetDescription>
        <nav aria-label={fa.nav.label} className="flex-1 overflow-y-auto p-3">
          <SidebarNav
            onNavigate={() => {
              setOpen(false);
            }}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
