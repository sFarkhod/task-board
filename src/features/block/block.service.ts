import { toast } from "react-toastify";

import {
  blockUserRequest,
  getBlockedUsers,
  unblockUserRequest,
} from "@/api/block";
import { getApiErrorMessage } from "@/api/handleApiError";
import { mapBlockedUsers } from "@/mapper/block.mapper";

export const fetchBlockedUsers = async () => {
  try {
    const result = await getBlockedUsers();
    return mapBlockedUsers(result.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
    return [];
  }
};

export const blockUser = async (data: {
  blockedUserId: string;
  comment?: string;
}) => {
  try {
    await blockUserRequest(data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

export const unblockUser = async (id: string) => {
  try {
    await unblockUserRequest(id);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};
