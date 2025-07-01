import { apiClient } from "@/shared/api";
import { Department, DepartmentFilters } from "../model/types";
import { PaginatedResponse } from "@/shared/types";

export const departmentApi = {
  getAll: async (
    filters?: DepartmentFilters
  ): Promise<PaginatedResponse<Department>> => {
    return await apiClient.get("/departments", {
      params: filters,
    });
  },
  create: async (
    department: Omit<
      Department,
      "id" | "createdAt" | "updatedAt" | "employeeCount"
    >
  ): Promise<Department> => {
    return await apiClient.post("/departments", department);
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/departments/${id}`);
  },
  update: async (
    id: string,
    department: Omit<Department, "id" | "createdAt" | "updatedAt">
  ): Promise<Department> => {
    return await apiClient.put(`/departments/${id}`, department);
  },
};
