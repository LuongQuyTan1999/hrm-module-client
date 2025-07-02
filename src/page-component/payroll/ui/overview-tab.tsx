import { PayrollProgress } from "./payroll-progress";
import { PayrollSummaryCard } from "./payroll-summary-card";

export function OverviewTab() {
  return (
    <div className="gap-6 grid lg:grid-cols-2">
      <PayrollSummaryCard />

      <PayrollProgress />
    </div>
  );
}
