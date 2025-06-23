import { PublicGuard } from "@/features/guard";
import { LoginPage } from "@/page-component/login";

export default function Home() {
  return (
    <PublicGuard>
      <LoginPage />
    </PublicGuard>
  );
}
