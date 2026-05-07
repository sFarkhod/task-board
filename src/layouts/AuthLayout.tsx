import { Outlet } from "react-router-dom";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <Outlet />
    </div>
  );
}