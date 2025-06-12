import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { dashboardData } from "../model/mock-data";

export function DepartmentGrowth() {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-0 border-gray-100 border-b">
        <CardTitle className="p-6 font-semibold text-gray-900 text-lg">
          Department Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {dashboardData.teamInsights.departmentGrowth.map((dept, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{dept.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">
                    {dept.employees} employees
                  </span>
                  <span className="font-medium text-green-600 text-sm">
                    {dept.growth}
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{
                    width: `${(dept.employees / 100) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-gray-100 border-t">
          <Link href="/analytics">
            <Button variant="outline" className="w-full">
              View Detailed Analytics
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
