import { Dialog as SheetPrimitive } from 'radix-ui';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

interface SheetContentProps extends ComponentProps<typeof SheetPrimitive.Content> {
  closeLabel: string;
}

/**
 * Side panel that slides in from the right edge, which is the inline-start side
 * in RTL. Radix Dialog provides the focus trap, Esc to close and focus return.
 */
export function SheetContent({ className, children, closeLabel, ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/50 data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <SheetPrimitive.Content
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(85vw,20rem)] flex-col border-s bg-surface pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] shadow-xl data-[state=closed]:animate-sheet-out-right data-[state=open]:animate-sheet-in-right',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className="absolute top-[calc(env(safe-area-inset-top,0px)+0.625rem)] left-3 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
          aria-label={closeLabel}
        >
          <X className="size-5" aria-hidden="true" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
