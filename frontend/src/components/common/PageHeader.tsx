import type { ReactNode } from 'react';

interface PageHeaderProps {
  /** Short sentence under the page title (the title itself is the h1 in the top bar). */
  description: string;
  /** Page-level actions, for example a "new lead" button. */
  actions?: ReactNode;
}

export function PageHeader({ description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">{description}</p>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
