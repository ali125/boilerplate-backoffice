export type PermissionBaseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  module: string;
  action: PermissionActions;
  userId: string;
};

export enum PermissionActions {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum PermissionModules {
  Post = "Post",
  Category = "Category",
  Tag = "Tag",
  User = "User",
  Role = "Role",
  Permission = "Permission",
}

export type PermissionFormValues = {
  module: string;
  action: PermissionActions;
};
