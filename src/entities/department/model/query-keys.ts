export const departmentQueries = {
  all: () => ["departments"] as const,
  list: (filters?: { name?: string }) =>
    ["departments", "list", filters] as const,
  detail: (id: string) => ["departments", "detail", id] as const,
} as const;
