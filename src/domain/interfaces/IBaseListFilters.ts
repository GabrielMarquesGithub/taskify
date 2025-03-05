export type IBaseListFilters = {
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  search?: string;
};
