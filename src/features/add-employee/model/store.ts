import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployeeApi } from "../api/add-employee";
import { toast } from "sonner";

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
      toast.error(error.message);
    },
  });
}
