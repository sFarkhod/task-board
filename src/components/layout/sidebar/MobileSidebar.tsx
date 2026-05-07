import { LayoutGrid, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { sidebarItems } from "./SidebarItems";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute left-0 top-0 h-full w-64 bg-gray-900 text-white p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LayoutGrid />
            <span className="text-lg font-semibold">{t("appName")}</span>
          </div>

          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
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
      </div>
    </div>
  );
}
