import { employeeApi, employeeQueries } from "@/entities/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmployeeFilters } from "./types";

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

export function useGetEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: employeeQueries.list(filters),
    queryFn: () => employeeApi.getAll(filters),
  });
}
