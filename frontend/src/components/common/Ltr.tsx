import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Left-to-right island inside RTL text, for phone numbers, emails, slugs,
 * tracking codes and other technical values. `isolate` stops the
 * surrounding Persian text from reordering its characters.
 */
export function Ltr({ className, ...props }: ComponentProps<'span'>) {
  return <span dir="ltr" className={cn('isolate', className)} {...props} />;
}
