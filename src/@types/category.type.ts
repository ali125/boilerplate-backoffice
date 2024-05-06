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
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string | null;
    status: string;
    blockedAt: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  parent: Category | null;
};

export type CategoryFormValues = {
  title: string;
  slug?: string;
  description: string;
  parentId?: string;
};
