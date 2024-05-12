import { CategoryBaseType } from "./category.type";
import { TagBaseType } from "./tag.type";
import { UserBaseType } from "./user.type";

export type PostBaseType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type PostItem = PostBaseType & {
  user: UserBaseType;
};

export type Post = PostItem & {
  user: UserBaseType;
  tags: TagBaseType[];
  category?: CategoryBaseType;
};

export type PostFormValues = {
  title: string;
  slug?: string;
  description: string;
  category?: { label: string; value: string };
  tags?: { label: string; value: string }[];
  image?: any;
};

export type PostFormBody = {
  title: string;
  slug?: string;
  description: string;
  categoryId?: string;
  tagIds?: string[];
  image?: any;
};
