export interface BlockedUser {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment: string;
  createdAt: string;

  blockedUser: {
    id: string;
    nickname: string;
    email?: string;
  };
}

export interface BlockedUserModel {
  id: string;
  userId: string;
  nickname: string;
  email?: string;
  comment?: string;
  blockedAt: string;
}
