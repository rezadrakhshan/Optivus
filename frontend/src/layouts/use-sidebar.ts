import { useCallback, useEffect, useState } from 'react';
import { isTypingTarget } from '@/lib/is-typing-target';
import { readStorage, writeStorage } from '@/lib/storage';
import { useMediaQuery } from '@/lib/use-media-query';

export const SIDEBAR_STORAGE_KEY = 'optivus.sidebar-collapsed';

export interface SidebarState {
  /** True at ≥1024px, where the sidebar pushes the content instead of overlaying it. */
  isDesktop: boolean;
  /** Whether the sidebar currently shows labels (264px) or only icons (72px). */
  expanded: boolean;
  toggle: () => void;
  /** Closes the tablet overlay; does nothing on desktop. */
  closeOverlay: () => void;
}

/**
 * Sidebar behaviour from the UI spec:
 * - ≥1024px: expanded or collapsed, remembered in localStorage.
 * - 768–1023px: collapsed rail; expanding opens it as an overlay (not remembered).
 * - <768px: hidden; the mobile drawer is used instead.
 * Ctrl+B toggles it (ignored while typing in a field).
 */
export function useSidebar(): SidebarState {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [collapsed, setCollapsed] = useState(() => readStorage(SIDEBAR_STORAGE_KEY) === 'true');
  const [overlayOpen, setOverlayOpen] = useState(false);

  const expanded = isDesktop ? !collapsed : overlayOpen;

  const toggle = useCallback(() => {
    if (isDesktop) {
      setCollapsed((current) => {
        writeStorage(SIDEBAR_STORAGE_KEY, String(!current));
        return !current;
      });
    } else {
      setOverlayOpen((open) => !open);
    }
  }, [isDesktop]);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && !event.altKey && event.key.toLowerCase() === 'b') {
        if (isTypingTarget(event.target)) return;
        event.preventDefault();
        toggle();
      } else if (event.key === 'Escape' && !isDesktop) {
        setOverlayOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [toggle, isDesktop]);

  return { isDesktop, expanded, toggle, closeOverlay };
}
