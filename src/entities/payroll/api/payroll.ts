import { apiClient } from "@/shared/api";

import { PaginatedResponse } from "@/shared/types";
import {
  AdvanceRequest,
  AdvanceRequestsFilters,
  PayrollFilters,
  PayrollRecord,
  UpdateAdvanceRequests,
} from "../model/types";

export const payrollApi = {
  getPayrolls: async (
    filters?: PayrollFilters
  ): Promise<PaginatedResponse<PayrollRecord>> => {
    return await apiClient.get("/payroll/payrolls", {
      params: filters,
    });
  },

  getAllAdvanceRequests: async (
    filters?: AdvanceRequestsFilters
  ): Promise<PaginatedResponse<AdvanceRequest>> => {
    return await apiClient.get(`/payroll/advance-requests`, {
      params: filters,
    });
  },

  createAdvanceRequests: async (
    body: AdvanceRequest
  ): Promise<AdvanceRequest> => {
    return await apiClient.post(`/payroll/advance-requests`, body);
  },

  updateAdvanceRequests: async (
    id: string,
    body: UpdateAdvanceRequests
  ): Promise<AdvanceRequest> => {
    return await apiClient.put(`/payroll/advance-requests/${id}`, body);
  },
};
