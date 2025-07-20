import { PayrollFilters } from "./types";

export const payrollQueries = {
  all: () => ["payroll"] as const,
  lists: () => ["payroll", "list"] as const,
  list: (filters?: PayrollFilters) => ["payroll", "list", filters] as const,
  detail: (id: string) => ["payrolls", "details", id] as const,
  allAdvanceRequests: () => ["advanceRequests"] as const,
  listsAdvanceRequests: () => ["advanceRequests", "list"] as const,
  listAdvanceRequests: (filters?: PayrollFilters) =>
    ["advanceRequests", "list", filters] as const,
} as const;
