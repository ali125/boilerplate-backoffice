import { PermissionActions } from "./permission.type";

export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInResponse = {
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
