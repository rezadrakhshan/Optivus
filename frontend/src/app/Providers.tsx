import { Direction } from 'radix-ui';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/theme/ThemeProvider';

/**
 * App-wide providers. Direction.Provider makes every Radix component
 * (menus, dialogs, tooltips) lay itself out right-to-left.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <Direction.Provider dir="rtl">
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </Direction.Provider>
  );
}
