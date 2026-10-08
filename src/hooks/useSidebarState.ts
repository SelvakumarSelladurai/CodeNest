import { useEffect, useState } from "react";

import {
  SIDEBAR_STORAGE_KEY,
  XL_BREAKPOINT_QUERY,
} from "../components/layout/sidebar/sidebar.config";
import { useMediaQuery } from "./useMediaQuery";

function readStoredCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
  } catch {
    return false; // Storage can be unavailable (privacy mode, disabled cookies)
  }
}

function storeCollapsed(value: boolean) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* storage unavailable */
  }
}

/**
 * Collapse state for the desktop sidebar.
 * Below xl the sidebar is always collapsed, and the saved preference is ignored.
 */
export function useSidebarState() {
  const isXl = useMediaQuery(XL_BREAKPOINT_QUERY);
  const [preferCollapsed, setPreferCollapsed] = useState<boolean>(readStoredCollapsed);

  useEffect(() => {
    storeCollapsed(preferCollapsed);
  }, [preferCollapsed]);

  return {
    collapsed: !isXl || preferCollapsed,
    canToggle: isXl,
    toggle: () => setPreferCollapsed((value) => !value),
  };
}