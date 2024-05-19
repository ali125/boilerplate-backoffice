import { PermissionActions } from "./permission.type";
import { RoleBaseType } from "./role.type";

export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInFormValues = SignInRequest;
export type SignInResponse = {
  accessToken: string;
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type SignUpFormValues = SignUpRequest & {
  confirmPassword: string;
};
export type SignUpResponse = {
  accessToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

export type UserRoleResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  description: string | null;
  superAdmin: boolean;
  userId: string;
  permissions: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    module: string;
    action: PermissionActions;
  }[];
};

export type ProfileResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  status: string;
  roleId: string;
  blockedAt: string | null;
  role: RoleBaseType;
  fullName: string;
  avatarUrl?: string | null;
  about: string | null;
};

export type ProfileFormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  avatar?: any;
  about?: string;
};

export type ProfileFormBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  avatar?: any;
};

export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordFormBody = {
  currentPassword: string;
  newPassword: string;
};
