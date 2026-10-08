import type { ReactNode } from "react";

export type NavItem = {
  label: string;
  to: string;
  icon: ReactNode;
};

export type NavSection = {
  id: string;
  label?: string;
  items: NavItem[];
};

export type SidebarUser = {
  name: string;
  email: string;
  initial: string;
};