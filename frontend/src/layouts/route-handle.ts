import { useEffect } from 'react';
import { useMatches } from 'react-router';
import { fa } from '@/i18n/fa';

/** Data attached to each route in the router (`handle`). */
export interface RouteHandle {
  title: string;
}

function isRouteHandle(value: unknown): value is RouteHandle {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string'
  );
}

/** Title of the deepest matched route; also keeps the browser tab title in sync. */
export function usePageTitle(): string {
  const matches = useMatches();
  const handle = [...matches].reverse().find((match) => isRouteHandle(match.handle))?.handle;
  const title = isRouteHandle(handle) ? handle.title : fa.app.name;

  useEffect(() => {
    document.title = `${title} | ${fa.app.name}`;
  }, [title]);

  return title;
}
