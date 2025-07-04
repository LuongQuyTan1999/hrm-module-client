import { PaginatedResponse } from "@/shared/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
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

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      department: Omit<
        Department,
        "id" | "createdAt" | "updatedAt" | "employeeCount"
      >
    ) => departmentApi.create(department),
    onSuccess: (newDepartment) => {
      queryClient.invalidateQueries({
        queryKey: departmentQueries.lists(),
      });

      queryClient.setQueryData(departmentQueries.list(), (oldData: any) =>
        oldData ? [...oldData, newDepartment] : [newDepartment]
      );
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => departmentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: departmentQueries.lists(),
      });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      department,
    }: {
      id: string;
      department: Omit<Department, "id" | "createdAt" | "updatedAt">;
    }) => departmentApi.update(id, department),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: departmentQueries.lists(),
      });
    },
  });
}
