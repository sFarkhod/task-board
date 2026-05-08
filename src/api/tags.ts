import type { Tag } from "@/types/task";

import { api } from "./axios";

export const getTags = () => api.get<Tag[]>("/tags");