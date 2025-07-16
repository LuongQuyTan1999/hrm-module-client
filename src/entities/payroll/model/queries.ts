import { PaginatedResponse } from "@/shared/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  AdvanceRequest,
  AdvanceRequestsFilters,
  PayrollFilters,
  PayrollRecord,
  UpdateAdvanceRequests,
} from "./types";
import { payrollQueries } from "./query-keys";
import { payrollApi } from "../api/payroll";

export function useGetPayrolls(
  filters?: PayrollFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<PayrollRecord>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: payrollQueries.list(filters),
    queryFn: () => payrollApi.getPayrolls(filters),
    ...options,
  });
}

export function useGetAllAdvanceRequests(
  filters?: AdvanceRequestsFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<AdvanceRequest>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: payrollQueries.listAdvanceRequests(filters),
    queryFn: () => payrollApi.getAllAdvanceRequests(filters),
    ...options,
  });
}

export function useCreateAdvanceRequests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AdvanceRequest) =>
      payrollApi.createAdvanceRequests(body),
    onSuccess: (newAdvance) => {
      queryClient.invalidateQueries({
        queryKey: payrollQueries.listsAdvanceRequests(),
      });

      queryClient.setQueryData(
        payrollQueries.listAdvanceRequests(),
        (oldData: any) => (oldData ? [...oldData, newAdvance] : [newAdvance])
      );
    },
  });
}

export function useUpdateAdvanceRequests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateAdvanceRequests }) =>
      payrollApi.updateAdvanceRequests(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: payrollQueries.listsAdvanceRequests(),
      });
    },
  });
}
