import type { Tag } from "@/types/task";

export const mapTag = (tag: Tag): Tag => ({
  id: tag.id,
  name: tag.name.trim(),
});

export const mapTags = (tags: Tag[]): Tag[] => {
  return (tags ?? []).map(mapTag);
};
