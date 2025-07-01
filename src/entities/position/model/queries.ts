import { PaginatedResponse } from "@/shared/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { positionApi } from "../api/position";
import { positionQueries } from "./query-keys";
import { Position, PositionFilters } from "./types";

export function useGetPositions(
  filters?: PositionFilters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Position>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: positionQueries.list(filters),
    queryFn: () => positionApi.getAll(filters),
    ...options,
  });
}

export function useCreatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      position: Omit<
        Position,
        "id" | "createdAt" | "updatedAt" | "employeeCount"
      >
    ) => positionApi.create(position),
    onSuccess: (newPosition) => {
      queryClient.invalidateQueries({
        queryKey: positionQueries.all(),
      });

      queryClient.setQueryData(positionQueries.list(), (oldData: any) =>
        oldData ? [...oldData, newPosition] : [newPosition]
      );
    },
  });
}

export function useDeletePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => positionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: positionQueries.lists(),
      });
    },
  });
}

export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      position,
    }: {
      id: string;
      position: Omit<
        Position,
        "id" | "createdAt" | "updatedAt" | "employeeCount"
      >;
    }) => positionApi.update(id, position),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: positionQueries.lists(),
      });
    },
  });
}
