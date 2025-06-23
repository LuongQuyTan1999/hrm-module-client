import { AuthGuard } from "@/features/guard";
import { DashboardPage } from "@/page-component/dashboard";

export default function Home() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
