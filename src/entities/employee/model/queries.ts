import { employeeApi, employeeQueries } from "@/entities/employee";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Employee, EmployeeFilters } from "./types";
import { PaginatedResponse } from "@/shared/types";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.add,
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      });

      queryClient.setQueryData(employeeQueries.list(), (oldData: any) =>
        oldData ? [...oldData, newEmployee] : [newEmployee]
      );
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      });

      queryClient.invalidateQueries({
        queryKey: employeeQueries.detail(data.id),
      });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      });
    },
  });
}

export function useGetEmployees(
  filters: EmployeeFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Employee>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: employeeQueries.list(filters),
    queryFn: () => employeeApi.getAll(filters),
    ...options,
  });
}
