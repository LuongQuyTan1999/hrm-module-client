import { apiClient } from "@/shared/api";
import { Position, PositionFilters } from "../model/types";
import { PaginatedResponse } from "@/shared/types";

export const positionApi = {
  getAll: async (
    filters?: PositionFilters
  ): Promise<PaginatedResponse<Position>> => {
    return await apiClient.get("/positions", {
      params: filters,
    });
  },
  create: async (
    position: Omit<Position, "id" | "createdAt" | "updatedAt" | "employeeCount">
  ): Promise<Position> => {
    return await apiClient.post("/positions", position);
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/positions/${id}`);
  },
  update: async (
    id: string,
    position: Omit<Position, "id" | "createdAt" | "updatedAt" | "employeeCount">
  ): Promise<Position> => {
    return await apiClient.put(`/positions/${id}`, position);
  },
};
