import { PaginatedResponse } from "@/shared/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { attendanceApi } from "../api/attendance";
import { attendanceQueries } from "./query-keys";
import {
  AttendanceFilters,
  LeaveRequest,
  LeaveStatus,
  LeaveType,
} from "./types";
import { LEAVE_TYPES } from "./constants";

export function useGetAllRequests(
  filters?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<LeaveRequest>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: attendanceQueries.requests(filters),
    queryFn: () => attendanceApi.getAllRequests(filters),
    ...options,
  });
}

export function useGetRemotesRequests(
  filters?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<LeaveRequest>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: attendanceQueries.remotes(filters),
    queryFn: () => attendanceApi.getRemotesRequests(filters),
    ...options,
  });
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: LeaveStatus;
      leaveType?: LeaveType;
    }) => attendanceApi.updateRequest(requestId, status),
    onSuccess: (data, { leaveType }) => {
      if (leaveType === LEAVE_TYPES.REMOTE) {
        queryClient.invalidateQueries({
          queryKey: attendanceQueries.remotes(),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: attendanceQueries.requests(),
        });
      }
    },
  });
}
