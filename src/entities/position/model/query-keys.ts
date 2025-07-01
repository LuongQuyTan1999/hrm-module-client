export const positionQueries = {
  all: () => ["positions"] as const,
  lists: () => ["positions", "list"] as const,
  list: (filters?: { name?: string }) =>
    ["positions", "list", filters] as const,
  detail: (id: string) => ["positions", "detail", id] as const,
} as const;
