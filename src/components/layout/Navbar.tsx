import { Menu } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Props) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      
      <div className="flex items-center gap-3">
        <Menu
          className="md:hidden cursor-pointer"
          onClick={onMenuClick}
        />
        <span className="font-semibold">Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {user?.nickname}
        </span>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}