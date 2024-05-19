import { RoleBaseType } from "./role.type";

export type UserBaseType = {
  id: string;
  firstName: string;
  fullName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  roleId: string;
  avatarUrl?: string | null;
  about: string | null;
  status: string;
  blockedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type UserItem = UserBaseType & {
  role: RoleBaseType;
};

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string | null;
  password?: string;
  roleId: string;
};
