import { AuthGuard } from "@/features/guard";
import { OrganizationPage } from "@/page-component/organization";

export default function Employees() {
  return (
    <AuthGuard>
      <OrganizationPage />
    </AuthGuard>
  );
}
