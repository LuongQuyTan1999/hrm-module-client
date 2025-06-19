import {
  AddEmployeeData,
  Employee,
  EmployeeFilters,
} from "@/entities/employee";
import { apiClient } from "@/shared/api";

export const employeeApi = {
  getAll: async (filters: EmployeeFilters): Promise<Employee> => {
    return await apiClient.get("/employees", {
      params: filters,
    });
  },

  add: async (data: AddEmployeeData): Promise<Employee> => {
    return await apiClient.post("/employees", data);
  },
};
