import { useSidebarState } from "../../../hooks/useSidebarState";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

/** Picks the right navigation for the viewport and owns the collapse state. */
export default function Sidebar() {
  const { collapsed, canToggle, toggle } = useSidebarState();

  return (
    <>
      <DesktopSidebar collapsed={collapsed} canToggle={canToggle} onToggle={toggle} />
      <MobileSidebar />
    </>
  );
}