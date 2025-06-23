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
};
