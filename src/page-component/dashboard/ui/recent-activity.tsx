import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Award,
  Calendar,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { dashboardData } from "../model/mock-data";

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hire":
        return <UserPlus className="w-4 h-4 text-green-600" />;
      case "leave":
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case "review":
        return <Award className="w-4 h-4 text-purple-600" />;
      case "promotion":
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case "training":
        return <Target className="w-4 h-4 text-indigo-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="gap-0 border border-gray-200">
      <CardHeader className="border-gray-100 border-b">
        <CardTitle className="font-semibold text-gray-900 text-lg">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {dashboardData.recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`p-4 ${
                index !== dashboardData.recentActivity.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900 truncate">
                      {activity.employee}
                    </p>
                    <span className="text-gray-500 text-xs">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600 text-sm">
                    {activity.action}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-2 border-gray-300 text-xs"
                  >
                    {activity.department}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 pb-0 border-gray-100 border-t">
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
