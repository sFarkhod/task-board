import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import { getUsers } from "@/api/user";
import { mapUsers } from "@/mapper/user.mapper";

export const fetchUsers = async () => {
  try {
    const result = await getUsers();
    return mapUsers(result.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
    return [];
  }
};
