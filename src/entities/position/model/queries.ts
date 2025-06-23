import { PaginatedResponse } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
