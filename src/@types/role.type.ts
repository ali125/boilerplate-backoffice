import { PermissionBaseType } from "./permission.type";
import { UserBaseType } from "./user.type";

export type RoleBaseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  description: string | null;
  superAdmin: false;
  userId: string;
};

export type Role = RoleBaseType & {
  permissions: PermissionBaseType[];
  user: UserBaseType;
};

export type RoleFormValues = {
  title: string;
  description?: string | null;
  superAdmin?: boolean;
  permissions?: string[];
};
