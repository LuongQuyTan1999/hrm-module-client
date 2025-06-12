import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { dashboardData } from "../model/constants";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Eye } from "lucide-react";

export function PendingAction() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-0 border-gray-100 border-b">
        <CardTitle className="p-6 font-semibold text-gray-900 text-lg">
          Pending Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {dashboardData.pendingActions.map((action, index) => (
            <div
              key={action.id}
              className={`p-4 ${
                index !== dashboardData.pendingActions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {action.title}
                    </h4>
                    <Badge className={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="mb-2 text-gray-600 text-sm">
                    {action.description}
                  </p>
                  <p className="text-gray-500 text-xs">Due: {action.dueDate}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-3">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-gray-100 border-t">
          <Button variant="outline" className="w-full">
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
