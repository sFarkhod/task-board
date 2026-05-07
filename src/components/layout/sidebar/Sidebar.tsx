import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { sidebarItems } from "./SidebarItems";

export default function Sidebar() {
  const { t } = useTranslation("common");

  return (
    <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col py-6 px-4">
      <div className="flex items-center gap-2 mb-6 ml-2">
        <LayoutGrid />
        <span className="text-lg font-semibold">{t("appName")}</span>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-3 py-2 rounded transition
                ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}
              `
              }
            >
              <Icon size={18} />

              <span>{t(item.label)}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
