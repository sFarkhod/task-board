import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function UserMenu({ t }: { t: (key: string) => string }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  if (!user) return null;

  const firstLetter = user.nickname.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          {firstLetter}
        </div>

        <span className="max-w-30 truncate text-sm text-gray-700">
          {user?.nickname}
        </span>
      </div>

      <div
        className={`absolute right-0 mt-2 w-56 bg-white border border-[#D9DFE4] rounded-lg shadow-lg p-3
        transition-all duration-200 origin-top-right
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 mb-3">
          <span className="font-medium text-gray-800 wrap-break-word">
            {user?.nickname}
          </span>
          {user?.email && (
            <span className="text-xs text-gray-500 wrap-break-word">
              {user?.email}
            </span>
          )}
        </div>

        <div className="border-t border-[#D9DFE4] pt-3">
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center justify-center cursor-pointer w-full gap-2 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="mr-1" size={18} />
            <span>{t("logout")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
