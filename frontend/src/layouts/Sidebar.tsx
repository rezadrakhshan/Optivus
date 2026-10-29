import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { fa } from '@/i18n/fa';
import { cn } from '@/lib/cn';
import { Brand } from './Brand';
import { SidebarNav } from './SidebarNav';
import type { SidebarState } from './use-sidebar';

const PANEL_ID = 'app-sidebar';

/**
 * Tablet and desktop sidebar (hidden below 768px). It sits on the right, the
 * inline-start side in RTL. A spacer in the page flow reserves its width,
 * and the panel itself is fixed so it can overlay content on tablets.
 */
export function Sidebar({ isDesktop, expanded, toggle, closeOverlay }: SidebarState) {
  const overlay = !isDesktop && expanded;
  const toggleLabel = expanded ? fa.nav.collapseSidebar : fa.nav.expandSidebar;

  return (
    <div
      className={cn(
        'hidden shrink-0 transition-[width] duration-200 md:block',
        isDesktop && expanded ? 'w-sidebar' : 'w-sidebar-collapsed',
      )}
    >
      {overlay && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 animate-overlay-in bg-overlay/40 lg:hidden"
          onClick={closeOverlay}
        />
      )}
      <div
        id={PANEL_ID}
        className={cn(
          'fixed inset-y-0 start-0 z-40 flex flex-col border-e bg-surface pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-[width] duration-200',
          expanded ? 'w-sidebar' : 'w-sidebar-collapsed',
          overlay && 'shadow-xl',
        )}
      >
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b',
            expanded ? 'px-4' : 'justify-center',
          )}
        >
          <Brand compact={!expanded} />
        </div>

        <nav aria-label={fa.nav.label} className="flex-1 overflow-y-auto p-3">
          <SidebarNav collapsed={!expanded} onNavigate={closeOverlay} />
        </nav>

        <div className={cn('border-t p-3', !expanded && 'flex justify-center')}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={expanded ? 'md' : 'icon'}
                onClick={toggle}
                aria-expanded={expanded}
                aria-controls={PANEL_ID}
                aria-label={expanded ? undefined : toggleLabel}
                className={cn(
                  'text-muted-foreground hover:text-foreground',
                  expanded && 'w-full justify-start',
                )}
              >
                {expanded ? (
                  <PanelRightClose aria-hidden="true" />
                ) : (
                  <PanelRightOpen aria-hidden="true" />
                )}
                {expanded && <span>{toggleLabel}</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {toggleLabel}{' '}
              <kbd dir="ltr" className="ms-1 font-sans opacity-80">
                {fa.nav.sidebarShortcut}
              </kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
