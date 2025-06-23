import { AuthGuard } from "@/features/guard";
import { EmployeesPage } from "@/page-component/employees";

export default function Employees() {
  return (
    <AuthGuard>
      <EmployeesPage />
    </AuthGuard>
  );
}
