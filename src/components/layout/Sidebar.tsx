import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col p-4">
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid />
        <span className="text-lg font-semibold">Task Board</span>
      </div>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="px-3 py-2 rounded hover:bg-gray-800 transition">
          Board
        </Link>
      </nav>
    </aside>
  );
}
