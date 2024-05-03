export type TableQuery = { [key: string]: string | number } & {
  page: number;
  filters?: string;
  perPage: number;
  sortBy?: string;
  sortOrder?: string;
};
