import { AuthGuard } from "@/features/guard";
import { OrganizationPage } from "@/page-component/organization";

export default function Organization() {
  return (
    <AuthGuard>
      <OrganizationPage />
    </AuthGuard>
  );
}
