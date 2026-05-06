import { Link } from "react-router-dom";
import { LayoutGrid, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-64 bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LayoutGrid />
            <span className="text-lg font-semibold">Task Board</span>
          </div>

          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            to="/"
            onClick={onClose}
            className="px-3 py-2 rounded hover:bg-gray-800"
          >
            Board
          </Link>
        </nav>
      </div>
    </div>
  );
}
