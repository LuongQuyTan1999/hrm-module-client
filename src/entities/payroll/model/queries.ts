import { PaginatedResponse } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PayrollFilters, PayrollRecord } from "./types";
import { payrollQueries } from "./query-keys";
import { payrollApi } from "../api/payroll";

export function useGetPayrolls(
  filters?: PayrollFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<PayrollRecord>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: payrollQueries.list(filters),
    queryFn: () => payrollApi.getPayrolls(filters),
    ...options,
  });
}
