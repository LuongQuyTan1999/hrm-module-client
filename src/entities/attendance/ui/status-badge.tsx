import { cn } from "@/shared/lib/tailwind-merge";
import { Badge } from "@/shared/ui/badge";
import { LEAVE_STATUS } from "../model/constants";
import { LeaveStatus } from "../model/types";

export function StatusBadge({
  status,
  className = "",
}: {
  status: LeaveStatus;
  className?: string;
}) {
  const config = {
    [LEAVE_STATUS.APPROVED]: {
      label: "✅ Approved",
      class: "bg-green-100 text-green-800",
    },
    [LEAVE_STATUS.PENDING]: {
      label: "⏳ Pending",
      class: "bg-yellow-100 text-yellow-800",
    },
    [LEAVE_STATUS.REJECTED]: {
      label: "❌ Rejected",
      class: "bg-red-100 text-red-800",
    },
  };
  return (
    <Badge variant="outline" className={cn(config[status]?.class, className)}>
      {config[status]?.label || "Unknown Status"}
    </Badge>
  );
}
