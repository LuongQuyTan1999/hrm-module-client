import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function PayrollProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Tháng 1/2025</span>
            <Badge className="bg-green-100 text-green-800">Đã hoàn thành</Badge>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-2">
            <div className="bg-green-600 rounded-full w-full h-2"></div>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>156/156 employees</span>
            <span>100%</span>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <h4 className="font-medium text-gray-700 text-sm">
            Recent Activities:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-green-500 rounded-full w-2 h-2"></div>
              <span className="text-gray-600">Approved January payroll</span>
              <span className="text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-blue-500 rounded-full w-2 h-2"></div>
              <span className="text-gray-600">
                Calculation completed for IT Department
              </span>
              <span className="text-gray-400">5 hours ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
              <span className="text-gray-600">
                Started January payroll calculation
              </span>
              <span className="text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
