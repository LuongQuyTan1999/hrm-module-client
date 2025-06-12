import { employeeQueries } from "@/entities/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEmployeeApi, getEmployeesApi } from "../api/add-employee";
import { EmployeeFilters } from "./types";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployeeApi,
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      });

      queryClient.setQueryData(employeeQueries.list(), (oldData: any) =>
        oldData ? [...oldData, newEmployee] : [newEmployee]
      );
    },
    onError: (error) => {
      console.error("Error adding employee:", error);
    },
  });
}

export function useGetEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: employeeQueries.list(filters),
    queryFn: () => getEmployeesApi(filters),
  });
}
