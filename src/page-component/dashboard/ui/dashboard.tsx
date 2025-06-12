import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";

import { DepartmentGrowth } from "./department-growth";
import { KeyMetrics } from "./key-metrics";
import { PendingAction } from "./pending-action";
import { QuickActions } from "./quick-actions";
import { QuickStats } from "./quick-stats";
import { RecentActivity } from "./recent-activity";
import { TopPerformers } from "./top-performers";
import { UpcomingEvents } from "./upcoming-events";

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
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 h-10 text-white">
            <Plus className="mr-2 w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <KeyMetrics />

      <QuickStats />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <RecentActivity />

        <PendingAction />
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <TopPerformers />

        <DepartmentGrowth />
      </div>

      <UpcomingEvents />

      <QuickActions />
    </div>
  );
}
