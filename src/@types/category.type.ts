import { UserBaseType } from "./user.type";

export type CategoryBaseType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  userId: string;
  parentId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Category = CategoryBaseType & {
  user: UserBaseType;
  parent: Category | null;
};

export type CategoryFormValues = {
  title: string;
  slug?: string;
  description: string;
  parentId?: string;
};
