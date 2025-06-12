export const employeeQueries = {
  all: () => ["employees"] as const,
  list: (filters?: { department?: string; search?: string }) =>
    ["employees", "list", filters] as const,
  detail: (id: string) => ["employees", "detail", id] as const,
} as const;
