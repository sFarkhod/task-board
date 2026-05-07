import { Ban, LayoutGrid } from "lucide-react";

export const sidebarItems = [
  {
    label: "board",
    path: "/",
    icon: LayoutGrid,
  },
  {
    label: "blockedUsers",
    path: "/blocked",
    icon: Ban,
  },
];
