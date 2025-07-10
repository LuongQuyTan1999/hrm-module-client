import { PayrollFilters } from "./types";

export const payrollQueries = {
  all: () => ["payroll"] as const,
  lists: () => ["payroll", "list"] as const,
  list: (filters?: PayrollFilters) => ["payroll", "list", filters] as const,
} as const;
