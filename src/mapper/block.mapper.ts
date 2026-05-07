import type { BlockedUser } from "../types/block";
import type { BlockedUserModel } from "../types/block";

export const mapBlockedUser = (item: BlockedUser): BlockedUserModel => {
  return {
    id: item.id ?? "",
    userId: item.blockedUserId ?? "",
    nickname: item.blockedUser.nickname ?? "",
    email: item.blockedUser.email ?? "",
    comment: item.comment ?? "",
    blockedAt: item.createdAt ?? "",
  };
};

export const mapBlockedUsers = (data: BlockedUser[]): BlockedUserModel[] => {
  return data.map(mapBlockedUser);
};
