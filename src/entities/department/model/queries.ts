import { PaginatedResponse } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { departmentApi } from "../api/department";
import { departmentQueries } from "./query-keys";
import { Department, DepartmentFilters } from "./types";

export function useGetDepartments(
  filters?: DepartmentFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Department>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: departmentQueries.list(filters),
    queryFn: () => departmentApi.getAll(filters),
    ...options,
  });
}
