import { AuthGuard } from "@/features/guard";
import { PayrollPage } from "@/page-component/payroll";

export default function Payroll() {
  return (
    <AuthGuard>
      <PayrollPage />
    </AuthGuard>
  );
}
