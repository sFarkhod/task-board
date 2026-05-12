import { KeyRound, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

import ChangePasswordModal from "../auth/ChangePasswordModal";
import Button from "./Button";
import UserAvatar from "./UserAvatar";

export default function UserMenu({ t, tAuth }: { t: (key: string) => string, tAuth: (key: string) => string }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

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

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <UserAvatar name={user?.nickname || ""} size={36} />

        <span className="max-w-30 truncate text-sm text-gray-700">
          {user?.nickname}
        </span>
      </div>

      <div
        className={`absolute right-0 z-50 mt-2 w-56 bg-white border border-pureSilicon rounded-lg shadow-lg p-3
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

        <div className="border-t border-pureSilicon pt-3">
          <Button
            onClick={() => {
              setPasswordModalOpen(true);
              setOpen(false);
            }}
            variant="secondary"
            className="flex items-center justify-center cursor-pointer w-full gap-2 px-3 py-1.5 rounded-lg transition mb-2"
          >
            <KeyRound size={18} />
            <span>{tAuth("changePassword")}</span>
          </Button>
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center justify-center cursor-pointer w-full gap-2 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="mr-1" size={18} />
            <span>{t("logout")}</span>
          </Button>
        </div>
        <ChangePasswordModal
          open={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          tAuth={tAuth}
        />
      </div>
    </div>
  );
}
