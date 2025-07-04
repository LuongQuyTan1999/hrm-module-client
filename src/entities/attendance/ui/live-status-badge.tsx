import { Badge } from "@/shared/ui/badge";
import { ATTENDANCE_STATUS } from "../model/constants";
import { AttendanceStatus } from "../model/types";
import { cn } from "@/shared/lib/tailwind-merge";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

export function LiveStatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = {
    [ATTENDANCE_STATUS.OFFICE]: {
      label: "🏢 Office",
      class: "bg-blue-100 text-blue-800",
    },
    [ATTENDANCE_STATUS.REMOTE]: {
      label: "🏠 Remote",
      class: "bg-orange-100 text-orange-800",
    },
    [ATTENDANCE_STATUS.LEAVE]: {
      label: "😴 On Leave",
      class: "bg-red-100 text-red-800",
    },
    [ATTENDANCE_STATUS.ABSENT]: {
      label: "❌ Absent",
      class: "bg-gray-100 text-gray-800",
    },
  };

  return (
    <Badge className={cn(config[status]?.class, className)}>
      {config[status]?.label}
    </Badge>
  );
}
