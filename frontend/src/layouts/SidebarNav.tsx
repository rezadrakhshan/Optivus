import type { ComponentProps } from 'react';
import { Link, useMatch } from 'react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { fa } from '@/i18n/fa';
import { cn } from '@/lib/cn';
import { navItems, type NavItem } from './nav-items';

interface SidebarNavProps {
  /** Icon-only mode: labels are visually hidden and shown as tooltips. */
  collapsed?: boolean;
  /** Called after a link is chosen, e.g. to close a drawer or overlay. */
  onNavigate?: () => void;
}

interface NavItemLinkProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  item: NavItem;
  collapsed: boolean;
}

/**
 * One navigation link. It works out its own active state and always passes a plain
 * string className, so Radix `asChild` wrappers (the tooltip trigger) can merge
 * their props into it. NavLink's function-valued className cannot be merged that way.
 */
function NavItemLink({ item, collapsed, className, ...props }: NavItemLinkProps) {
  const isActive = useMatch({ path: item.to, end: item.end ?? false }) !== null;

  return (
    <Link
      to={item.to}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150',
        collapsed && 'justify-center px-0',
        isActive
          ? 'bg-accent text-accent-foreground before:absolute before:inset-y-2 before:start-0 before:w-[3px] before:rounded-full before:bg-primary dark:before:bg-accent-foreground'
          : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground',
        className,
      )}
      {...props}
    >
      <item.icon className="size-5 shrink-0" aria-hidden="true" />
      <span className={cn('truncate', collapsed && 'sr-only')}>{item.label}</span>
      {item.comingSoon && !collapsed && (
        <span className="ms-auto rounded-full border border-warning/40 px-2 py-0.5 text-[0.6875rem] leading-4 text-warning">
          {fa.nav.comingSoon}
        </span>
      )}
    </Link>
  );
}

export function SidebarNav({ collapsed = false, onNavigate }: SidebarNavProps) {
  return (
    <ul className="flex flex-col gap-1">
      {navItems.map((item) => (
        <li key={item.to}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <NavItemLink item={item} collapsed onClick={onNavigate} />
              </TooltipTrigger>
              {/* Physical "left": the content sits to the left of a right-hand sidebar. */}
              <TooltipContent side="left">
                {item.label}
                {item.comingSoon && ` (${fa.nav.comingSoon})`}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavItemLink item={item} collapsed={false} onClick={onNavigate} />
          )}
        </li>
      ))}
    </ul>
  );
}
