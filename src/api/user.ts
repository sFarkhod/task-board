import type { User } from "../types/auth";
import { api } from "./axios";

export const getUsers = () => api.get<User[]>("/users");
