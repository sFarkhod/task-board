import { NavLink } from "react-router-dom";
import { LayoutGrid, X } from "lucide-react";
import { useTranslation } from "react-i18next";

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
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            {t("board")}
          </NavLink>
          <NavLink
            to="/blocked"
            onClick={onClose}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            {t("blockedUsers")}
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
