import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getUser } from "@/utils/authUtil";

import UserAvatar from "../ui/UserAvatar";

interface UserOption {
  value: string;
  label: string;
}

interface Props {
  users: UserOption[];
  value?: string;
  onChange: (userId: string) => void;
}

export default function AssigneeSelect({ users, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const currentUserId = getUser()?.id || "";
  const sortedUsers = [...users].sort((a, b) => {
    if (a.value === currentUserId) return -1;
    if (b.value === currentUserId) return 1;

    return a.label.localeCompare(b.label);
  });

  console.log("sortedUsers", sortedUsers);
  console.log("value", value);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedUser = sortedUsers.find((u) => u.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1 hover:bg-gray-50 transition cursor-pointer"
      >
        {selectedUser ? (
          <>
            <UserAvatar name={selectedUser.label} size={24} />

            <span className="text-sm">{selectedUser.label}</span>
          </>
        ) : (
          <span className="text-sm text-gray-400">Assign</span>
        )}

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 z-50
            min-w-max max-h-64 overflow-y-auto
            rounded-xl border border-gray-200
            bg-white shadow-lg overflow-x-hidden
          "
        >
          {sortedUsers.map((user) => {
            const isMe = user.value === currentUserId;
            return (
              <button
                key={user.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  onChange(user.value);

                  setOpen(false);
                }}
                className="
                w-full flex items-center justify-between
                gap-4 px-3 py-2
                hover:bg-gray-100 transition
                whitespace-nowrap cursor-pointer
              "
              >
                <div className="flex items-center gap-2">
                  <UserAvatar name={user.label} size={28} />

                  <span className="text-sm">
                    {user.label}
                    {isMe && (
                      <span className="ml-1 text-xs text-blue-500">(You)</span>
                    )}
                  </span>
                </div>

                {value === user.value && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
