import { UserRelation } from "./user.type";

export type Category = {
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
  user: UserRelation;
  parent: Category | null;
};

export type CategoryFormValues = {
  title: string;
  slug?: string;
  description: string;
  parentId?: string;
};
