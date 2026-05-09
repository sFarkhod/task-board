import { getUsers } from "@/api/user";
import { mapUsers } from "@/mapper/user.mapper";

export const fetchUsers = async () => {
  try {
    const result = await getUsers();
    return mapUsers(result.data);
  } catch {
    return [];
  }
};