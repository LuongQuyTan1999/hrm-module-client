import { apiClient } from "@/shared/api";

import { PaginatedResponse } from "@/shared/types";
import {
  AdvanceRequest,
  AdvanceRequestsFilters,
  CreatePayrollDto,
  PayrollDetails,
  PayrollFilters,
  PayrollRecord,
  UpdateAdvanceRequests,
} from "../model/types";

export const payrollApi = {
  getPayrolls: async (
    filters?: PayrollFilters
  ): Promise<PaginatedResponse<PayrollRecord>> => {
    return await apiClient.get("/payrolls", {
      params: filters,
    });
  },

  createPayrolls: async (
    body: CreatePayrollDto
  ): Promise<{ payrolls: PayrollDetails[] }> => {
    return await apiClient.post("/payrolls/batch", body);
  },

  getPayroll: async (payrollId: string): Promise<PayrollDetails> => {
    return await apiClient.get(`/payroll-details/${payrollId}`);
  },

  getAllAdvanceRequests: async (
    filters?: AdvanceRequestsFilters
  ): Promise<PaginatedResponse<AdvanceRequest>> => {
    return await apiClient.get(`/advance-requests`, {
      params: filters,
    });
  },

  createAdvanceRequests: async (
    body: AdvanceRequest
  ): Promise<AdvanceRequest> => {
    return await apiClient.post(`/advance-requests`, body);
  },

  updateAdvanceRequests: async (
    id: string,
    body: UpdateAdvanceRequests
  ): Promise<AdvanceRequest> => {
    return await apiClient.put(`/advance-requests/${id}`, body);
  },
};
