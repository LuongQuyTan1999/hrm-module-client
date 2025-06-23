import {
  AddEmployeeData,
  Employee,
  EmployeeFilters,
  UpdateEmployeeData,
} from "@/entities/employee";
import { apiClient } from "@/shared/api";
import { PaginatedResponse } from "@/shared/types";

export const employeeApi = {
  getAll: async (
    filters: EmployeeFilters
  ): Promise<PaginatedResponse<Employee>> => {
    return await apiClient.get("/employees", {
      params: filters,
    });
  },

  update: async (data: UpdateEmployeeData): Promise<Employee> => {
    const { id, ...updateData } = data;
    return await apiClient.put(`/employees/${id}`, updateData);
  },

  add: async (data: AddEmployeeData): Promise<Employee> => {
    return await apiClient.post("/employees", data);
  },

  delete: async (id: string): Promise<string> => {
    return await apiClient.delete(`/employees/${id}`);
  },
};
