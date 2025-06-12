import { AddEmployeeData, Employee } from "@/entities/employee";
import { apiClient } from "@/shared/api";
import { EmployeeFilters } from "../model/types";

export const addEmployeeApi = async (
  data: AddEmployeeData
): Promise<Employee> => {
  return await apiClient.post("/api/employees", data);
};

export const getEmployeesApi = async (
  filters: EmployeeFilters
): Promise<Employee[]> => {
  return await apiClient.get("/employees", {
    params: filters,
  });
};
