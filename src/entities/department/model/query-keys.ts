import { DepartmentFilters } from "./types";

export const departmentQueries = {
  all: () => ["departments"] as const,
  lists: () => ["departments", "list"] as const,
  list: (filters?: DepartmentFilters) =>
    ["departments", "list", filters] as const,
  detail: (id: string) => ["departments", "detail", id] as const,
} as const;
