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
};
