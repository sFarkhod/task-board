import { api } from "./axios";
import type { BlockedUser } from "../types/block";

export const getBlockedUsers = () => api.get<BlockedUser[]>("/blocks/me");

export const blockUserRequest = (data: {
  blockedUserId: string;
  comment?: string;
}) => api.post("/blocks", data);

export const unblockUserRequest = (id: string) => api.delete(`/blocks/me/${id}`);
