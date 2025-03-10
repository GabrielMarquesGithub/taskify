export type IEntityListFilters<T extends string> = {
  limit?: number;
  offset?: number;
  orderBy?: T;
  order?: "asc" | "desc";
  search?: string;
};
