import { apiClient } from "@/shared/api";
import {
  AttendanceFilters,
  LeaveRequest,
  LeaveStatus,
  LeaveType,
} from "../model/types";
import { PaginatedResponse } from "@/shared/types";

export const attendanceApi = {
  getAllRequests: async (
    filters?: AttendanceFilters
  ): Promise<PaginatedResponse<LeaveRequest>> => {
    return await apiClient.get("/attendance/request", {
      params: filters,
    });
  },

  getRemotesRequests: async (
    filters?: AttendanceFilters
  ): Promise<PaginatedResponse<LeaveRequest>> => {
    return await apiClient.get("/attendance/request/remote", {
      params: filters,
    });
  },

  updateRequest: async (
    requestId: string,
    status: LeaveStatus
  ): Promise<LeaveRequest> => {
    return await apiClient.post(`/attendance/request/${requestId}`, { status });
  },
};
