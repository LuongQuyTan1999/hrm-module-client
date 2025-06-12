import { AddEmployeeData, Employee } from "@/entities/employee";
import { apiClient } from "@/shared/api";

export const addEmployeeApi = async (
  data: AddEmployeeData
): Promise<Employee> => {
  return await apiClient.post("/api/employees", data);
};

export const getEmployeesApi = async (): Promise<Employee[]> => {
  return await apiClient.get("/employees");
};
