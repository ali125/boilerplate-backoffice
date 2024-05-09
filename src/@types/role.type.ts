import { Permission } from "./permission.type";
import { UserRelation } from "./user.type";

export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  description: string | null;
  permissions: Permission[];
  superAdmin: false;
  userId: string;
  user: UserRelation;
};

export type RoleFormValues = {
  title: string;
  description?: string | null;
  superAdmin?: boolean;
  permissions?: string[];
};
