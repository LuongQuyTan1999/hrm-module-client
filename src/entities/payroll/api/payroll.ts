import { apiClient } from "@/shared/api";

import { PaginatedResponse } from "@/shared/types";
import { PayrollFilters, PayrollRecord } from "../model/types";

export const payrollApi = {
  getPayrolls: async (
    filters?: PayrollFilters
  ): Promise<PaginatedResponse<PayrollRecord>> => {
    return await apiClient.get("/payroll/payrolls", {
      params: filters,
    });
  },
};
