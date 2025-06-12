import { Card, CardContent } from "@/shared/ui/card";
import { BarChart3, Building2, UserPlus, Users } from "lucide-react";
import { dashboardData } from "../model/constants";

export function KeyMetrics() {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-600 text-sm">
                Total Employees
              </p>
              <p className="font-bold text-gray-900 text-2xl">
                {dashboardData.metrics.totalEmployees}
              </p>
              <p className="font-medium text-green-600 text-sm">
                {dashboardData.metrics.totalEmployeesChange} from last month
              </p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-600 text-sm">New Hires</p>
              <p className="font-bold text-gray-900 text-2xl">
                {dashboardData.metrics.newHires}
              </p>
              <p className="font-medium text-green-600 text-sm">
                {dashboardData.metrics.newHiresChange} from last month
              </p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-600 text-sm">Departments</p>
              <p className="font-bold text-gray-900 text-2xl">
                {dashboardData.metrics.departments}
              </p>
              <p className="font-medium text-gray-600 text-sm">
                {dashboardData.metrics.departmentsChange} from last month
              </p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-600 text-sm">
                Active Projects
              </p>
              <p className="font-bold text-gray-900 text-2xl">
                {dashboardData.metrics.activeProjects}
              </p>
              <p className="font-medium text-green-600 text-sm">
                {dashboardData.metrics.activeProjectsChange} from last month
              </p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
