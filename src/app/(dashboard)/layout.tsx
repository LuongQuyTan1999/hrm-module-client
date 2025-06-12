import { HRMLayout } from "@/widgets/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HRMLayout>{children}</HRMLayout>;
}
