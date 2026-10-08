import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { SidebarLink } from "./DesktopSidebar";
import { ALL_NAV_ITEMS, FLOAT_BUTTON, FOCUS_RING, cx } from "./sidebar.config";

/**
 * Floating menu for screens below md.
 * Tapping the button reveals every nav icon above it.
 */
export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Backdrop: tap outside to close */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-30 md:hidden"
        />
      )}

      <div className="fixed bottom-5 left-4 z-40 flex flex-col items-center gap-3 md:hidden">
        {open && (
          <nav
            id="mobile-menu"
            aria-label="Primary navigation"
            className="flex flex-col items-center gap-2.5"
          >
            {ALL_NAV_ITEMS.map((item) => (
              <SidebarLink key={item.to} item={item} collapsed onNavigate={close} />
            ))}
          </nav>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={cx(
            "flex items-center justify-center border border-sky-100 bg-white text-sky-600",
            "shadow-sky-200/60 transition-transform active:scale-95",
            FLOAT_BUTTON,
            FOCUS_RING
          )}
        >
          {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}