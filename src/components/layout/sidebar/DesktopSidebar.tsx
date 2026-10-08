import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/CodeNestLogo2.png";
import {
  CURRENT_USER,
  FLOAT_ACTIVE,
  FLOAT_BUTTON,
  FLOAT_INACTIVE,
  FOCUS_RING,
  NAV_SECTIONS,
  TOOLTIP_CLASS,
  cx,
} from "./sidebar.config";
import type { NavItem, NavSection } from "./sidebar.types";

/* -------------------------------------------------------------------------- */
/*                                  Link                                      */
/* -------------------------------------------------------------------------- */

/**
 * A single navigation link.
 * Collapsed: a floating icon button with a tooltip.
 * Expanded: a full-width row with label and accent bar.
 * Also used by MobileSidebar.
 */
export function SidebarLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cx(
          "group relative flex items-center text-sm font-medium transition-all duration-200",
          FOCUS_RING,
          collapsed
            ? cx(FLOAT_BUTTON, "mx-auto justify-center", isActive ? FLOAT_ACTIVE : FLOAT_INACTIVE)
            : cx(
                "h-10 gap-3 rounded-xl px-3",
                isActive ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
              )
        )
      }
    >
      {({ isActive }) => (
        <>
          {!collapsed && (
            <span
              aria-hidden="true"
              className={cx(
                "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-sky-400",
                "transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          <span
            aria-hidden="true"
            className={cx(
              "flex size-5 shrink-0 items-center justify-center transition-colors duration-200",
              !collapsed && (isActive ? "text-sky-600" : "text-slate-400 group-hover:text-sky-600")
            )}
          >
            {item.icon}
          </span>

          {collapsed ? (
            <>
              <span className="sr-only">{item.label}</span>
              <span aria-hidden="true" className={TOOLTIP_CLASS}>
                {item.label}
              </span>
            </>
          ) : (
            <span className="truncate whitespace-nowrap">{item.label}</span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cx("flex h-16 shrink-0 items-center", collapsed ? "justify-center" : "px-4")}>
      <NavLink
        to="/dashboard"
        aria-label="CodeNest home"
        className={cx(
          "group relative flex min-w-0 items-center rounded-lg outline-none",
          "focus-visible:ring-2 focus-visible:ring-sky-400",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <img src={logo} alt="" className="size-9 shrink-0 object-contain" />

        {collapsed ? (
          <span aria-hidden="true" className={TOOLTIP_CLASS}>
            CodeNest
          </span>
        ) : (
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-base font-bold tracking-tight text-slate-900">CodeNest</p>
            <p className="text-[11px] text-sky-600/80">Learn · Build · Master</p>
          </div>
        )}
      </NavLink>
    </div>
  );
}

function SidebarSection({ section, collapsed }: { section: NavSection; collapsed: boolean }) {
  return (
    <div className="mt-5 first:mt-0">
      {section.label &&
        (collapsed ? (
          <div className="mx-auto mb-3 h-px w-6 bg-sky-100" aria-hidden="true" />
        ) : (
          <div className="mb-2 flex items-center px-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-600/60">
              {section.label}
            </p>
          </div>
        ))}

      <nav
        aria-label={section.label ?? "Main"}
        className={cx("flex flex-col", collapsed ? "items-center gap-2.5" : "gap-1")}
      >
        {section.items.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </div>
  );
}

function SidebarUserCard({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="p-3">
      <button
        type="button"
        aria-label={`Account: ${CURRENT_USER.name}`}
        className={cx(
          "group relative flex w-full items-center rounded-xl p-2 outline-none transition-colors",
          "hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-400",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-semibold text-white shadow-sm">
          {CURRENT_USER.initial}
        </div>

        {collapsed ? (
          <span aria-hidden="true" className={TOOLTIP_CLASS}>
            {CURRENT_USER.name}
          </span>
        ) : (
          <>
            <div className="min-w-0 flex-1 overflow-hidden text-left">
              <p className="truncate text-sm font-semibold text-slate-900">{CURRENT_USER.name}</p>
              <p className="truncate text-xs text-slate-500">{CURRENT_USER.email}</p>
            </div>
            <FiChevronDown size={16} className="shrink-0 text-sky-500/60" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Desktop UI                                 */
/* -------------------------------------------------------------------------- */

type DesktopSidebarProps = {
  collapsed: boolean;
  canToggle: boolean;
  onToggle: () => void;
};

export default function DesktopSidebar({ collapsed, canToggle, onToggle }: DesktopSidebarProps) {
  return (
    <aside
      aria-label="Primary navigation"
      className={cx(
        "relative hidden h-screen shrink-0 flex-col md:flex",
        "border-r border-sky-100 bg-white",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[264px]"
      )}
    >
      <SidebarBrand collapsed={collapsed} />

      {/* Tooltips must escape the rail, so it only scrolls when expanded */}
      <div
        className={cx(
          "flex-1 px-3 py-4 [scrollbar-width:thin]",
          collapsed ? "overflow-visible" : "overflow-y-auto overscroll-contain"
        )}
      >
        {NAV_SECTIONS.map((section) => (
          <SidebarSection key={section.id} section={section} collapsed={collapsed} />
        ))}
      </div>

      <SidebarUserCard collapsed={collapsed} />

      {canToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className={cx(
            "group absolute -right-3 top-[52px] z-50 flex size-6 items-center justify-center",
            "rounded-full border border-sky-200 bg-white text-sky-600",
            "shadow-[0_2px_8px_rgba(14,165,233,0.2)] transition-all duration-200",
            "hover:scale-110 hover:border-sky-400 hover:bg-sky-50",
            FOCUS_RING
          )}
        >
          {collapsed ? (
            <FiChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <FiChevronLeft size={14} strokeWidth={2.5} aria-hidden="true" />
          )}

          <span aria-hidden="true" className={TOOLTIP_CLASS}>
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </button>
      )}
    </aside>
  );
}