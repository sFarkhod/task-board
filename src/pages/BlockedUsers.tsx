import { Trash2, UserX } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import BlockUserModal from "@/components/blocked/ BlockUserModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { useBlockedUsers } from "@/features/block/hooks/useBlockedUsers";
import { useUnblockUser } from "@/features/block/hooks/useUnblockUser";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function BlockedUsers() {
  usePageTitle("blockedUsers");
  
  const { t } = useTranslation("block");
  const { data: users, loading, refetch } = useBlockedUsers();
  const { unblock } = useUnblockUser();
  const [open, setOpen] = useState(false);

  const handleUnblock = async (id: string) => {
    await unblock(id);
    refetch();
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4 w-full">
        <Button
          variant="danger"
          className="max-w-40 flex items-center justify-center rounded-lg px-4"
          onClick={() => setOpen(true)}
        >
          <UserX className="mr-2" size={20} />
          <span>{t("blockUser")}</span>
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <Spinner size="md" color="#D9DFE4" />
        ) : users.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <UserX className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("noBlockedUsers")}
            </h3>
            <p className="text-gray-600">{t("noBlockedUsersDescription")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.map((user) => (
              <Card
                key={user.id}
                className="shadow-sm hover:shadow-md transition border border-pureSilicon"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <UserX className="text-red-600" size={24} />
                  </div>
                  <button
                    onClick={() => handleUnblock(user.userId)}
                    className="text-gray-400 hover:text-red-600 transition cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <h3 className="font-semibold text-gray-800 mb-1 truncate">
                  {user.nickname}
                </h3>
                <p className="text-sm text-gray-600 mb-3 truncate">
                  {user.email}
                </p>

                {user.comment && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {user.comment}
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  {t("blockedOn")}{" "}
                  {new Date(user.blockedAt).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t("blockUser")}
        description={t("blockUserDescription")}
      >
        <BlockUserModal
          key={open ? "open" : "closed"}
          onClose={() => setOpen(false)}
          onSuccess={refetch}
        />
      </Modal>
    </div>
  );
}
