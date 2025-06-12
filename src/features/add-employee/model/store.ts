import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployeeApi } from "../api/add-employee";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployeeApi,
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      queryClient.setQueryData(["employees"], (oldData: any) =>
        oldData ? [...oldData, newEmployee] : [newEmployee]
      );
    },
    onError: (error) => {
      console.error("Failed to create employee:", error);
    },
  });
}
