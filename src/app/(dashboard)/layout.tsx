import { HRMLayout } from "@/widgets/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HRMLayout>{children}</HRMLayout>;
}
