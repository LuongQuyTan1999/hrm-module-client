import { AttendanceFilters } from "./types";

export const attendanceQueries = {
  all: () => ["attendance"] as const,
  lists: () => ["attendance", "list"] as const,
  requests: (filters?: AttendanceFilters) =>
    ["attendance", "list", "requests", filters] as const,
  remotes: (filters?: AttendanceFilters) =>
    ["attendance", "list", "remote", filters] as const,
} as const;
