import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import MobileSidebar from "@/components/layout/sidebar/MobileSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={() => setIsOpen(true)} />
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
