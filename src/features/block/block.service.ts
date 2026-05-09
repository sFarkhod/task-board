import {
  blockUserRequest,
  getBlockedUsers,
  unblockUserRequest,
} from "@/api/block";
import { mapBlockedUsers } from "@/mapper/block.mapper";

export const fetchBlockedUsers = async () => {
  const result = await getBlockedUsers();
  return mapBlockedUsers(result.data);
};

export const blockUser = async (data: {
  blockedUserId: string;
  comment?: string;
}) => {
  await blockUserRequest(data);
};

export const unblockUser = async (id: string) => {
  await unblockUserRequest(id);
};
