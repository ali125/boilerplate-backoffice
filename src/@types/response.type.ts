export type Response<T> = {
  success: boolean;
  data: T;
};

export type ListPagination<T> = {
  currentPage: number;
  data: T;
  perPage: number;
  total: number;
};

export type ErrorResponse = {
  data: {
    message: { [key: string]: string };
    success: boolean;
  };
  status: number;
};
