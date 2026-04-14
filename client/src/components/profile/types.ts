import type { ReactElement } from "react";

export type SidebarItem = {
  label: string;
  icon: ReactElement;
  active?: boolean;
  muted?: boolean;
};

export type StatItem = {
  label: string;
  value: string;
  icon: ReactElement;
};

export type OrderItem = {
  id: string;
  date: string;
  status: "Delivered" | "Processing";
  total: string;
};
