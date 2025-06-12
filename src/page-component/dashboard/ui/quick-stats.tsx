import { Card, CardContent } from "@/shared/ui/card";
import { AlertCircle, Award, Cake, Clock, Gift, UserPlus } from "lucide-react";
import { dashboardData } from "../model/constants";

export function QuickStats() {
  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <Clock className="mx-auto mb-2 w-8 h-8 text-blue-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.employeesOnLeave}
            </p>
            <p className="text-gray-600 text-sm">On Leave</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-2 w-8 h-8 text-yellow-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.pendingLeaveRequests}
            </p>
            <p className="text-gray-600 text-sm">Pending Requests</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <Cake className="mx-auto mb-2 w-8 h-8 text-pink-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.birthdaysThisWeek}
            </p>
            <p className="text-gray-600 text-sm">Birthdays</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <Gift className="mx-auto mb-2 w-8 h-8 text-green-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.anniversariesThisMonth}
            </p>
            <p className="text-gray-600 text-sm">Anniversaries</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <Award className="mx-auto mb-2 w-8 h-8 text-purple-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.performanceReviewsDue}
            </p>
            <p className="text-gray-600 text-sm">Reviews Due</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="text-center">
            <UserPlus className="mx-auto mb-2 w-8 h-8 text-indigo-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {dashboardData.quickStats.openPositions}
            </p>
            <p className="text-gray-600 text-sm">Open Positions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
