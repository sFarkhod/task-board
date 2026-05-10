import { getTags } from "@/api/tags";
import { mapTags } from "@/mapper/tag.mapper";

export const fetchTags = async () => {
  const res = await getTags();

  return mapTags(res.data);
};
