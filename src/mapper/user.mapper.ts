import type { User } from "../types/auth";
import type { UserModel } from "../types/user";

export const mapUser = (user: User): UserModel => {
  return {
    value: user.id ?? "",
    label: user.nickname ?? "",
  };
};

export const mapUsers = (data: User[]): UserModel[] => {
  return data.map(mapUser);
};
