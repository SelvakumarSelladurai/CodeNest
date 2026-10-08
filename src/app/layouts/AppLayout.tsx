import { FiBell } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import SearchBar from "../../components/layout/SearchBar";
import Sidebar from "../../components/layout/sidebar/Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-base-200">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header
          className="
            flex
            h-16
            shrink-0
            items-center
            justify-between
            gap-4
            border-b
            border-base-300
            bg-base-100
            px-4
            sm:px-6
          "
        >
          <SearchBar />

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="
                btn
                btn-ghost
                btn-square
                btn-sm
                text-base-content/60
              "
              aria-label="Notifications"
            >
              <FiBell
                size={18}
                aria-hidden="true"
              />
            </button>

            <div className="hidden h-6 w-px bg-base-300 sm:block" />

            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              S
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;