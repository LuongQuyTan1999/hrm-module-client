import { AuthGuard } from "@/features/guard";
import { AttendancePage } from "@/page-component/attendance";

export default function Attendance() {
  return (
    <AuthGuard>
      <AttendancePage />
    </AuthGuard>
  );
}
