// app/data/sidebarMenu.ts
import { Building2, BarChart3, Settings, Brain } from "lucide-react";

export type SidebarView =
  | "portfolio"
  | "analytics"
  | "controls"
  | "ai-insights"
  | "custom-services";

export interface SidebarMenuItem {
  id: SidebarView;
  label: string;
  icon: typeof Building2;
}

export const sidebarMenuItems: SidebarMenuItem[] = [
  { id: "portfolio", label: "Portfolio", icon: Building2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "controls", label: "Controls", icon: Settings },
  { id: "ai-insights", label: "AI Insights", icon: Brain },
];
