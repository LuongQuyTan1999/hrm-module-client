import { AddEmployee } from "@/features/add-employee";
import { KeyMetrics } from "./key-metrics";
import { PendingAction } from "./pending-action";
import { QuickStats } from "./quick-stats";
import { RecentActivity } from "./recent-activity";

export function DashboardPage() {
  return (
    <div className="space-y-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="font-semibold text-gray-900 text-2xl">HR Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back! Here's your organization overview
          </p>
        </div>

        <AddEmployee />
      </div>

      <KeyMetrics />

      <QuickStats />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <RecentActivity />

        <PendingAction />
      </div>
    </div>
  );
}
