import { PermissionBaseType } from "./permission.type";
import { RoleBaseType } from "./role.type";

// ============= Sign In =============
export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInFormValues = SignInRequest;
export type SignInResponse = {
  accessToken: string;
};

// ============= Sign Up =============
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

// ============= Refresh Token =============
export type RefreshTokenResponse = {
  accessToken: string;
};

// ============= User Role =============
export type UserRoleResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  description: string | null;
  superAdmin: boolean;
  userId: string;
  permissions: PermissionBaseType[];
};

// ============= Profile =============
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

// ============= Change Passowrd =============
export type ChangePasswordFormBody = {
  currentPassword: string;
  newPassword: string;
};
export type ChangePasswordFormValues = ChangePasswordFormBody & {
  confirmPassword: string;
};

// ============= Forgot Password =============
export type ForgotPasswordResponse = {
  message: string;
};
export type ForgotPasswordRequest = {
  email: string;
};

// ============= Reset Password =============
export type ResetPasswordResponse = {
  message: string;
};
export type ResetPasswordRequest = {
  newPassword: string;
  token: string;
};
export type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};
