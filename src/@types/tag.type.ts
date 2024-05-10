import { UserBaseType } from "./user.type";

export type TagBaseType = {
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

export type Tag = TagBaseType & {
  user: UserBaseType;
};

export type TagFormValues = {
  title: string;
  slug?: string;
  description: string;
};
