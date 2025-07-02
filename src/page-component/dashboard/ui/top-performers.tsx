import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";
import { dashboardData } from "../model/mock-data";

export function TopPerformers() {
  return (
    <Card className="gap-0 border border-gray-200">
      <CardHeader className="border-gray-100 border-b">
        <CardTitle className="font-semibold text-gray-900 text-lg">
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent >
        <div className="space-y-4">
          {dashboardData.teamInsights.topPerformers.map((performer, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                  <span className="font-medium text-blue-600 text-sm">
                    {performer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{performer.name}</p>
                  <p className="text-gray-600 text-sm">
                    {performer.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-gray-900">
                  {performer.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="w-full">
        <div className="mt-4 pt-4 border-gray-100 border-t">
          <Link href="/performance">
            <Button variant="outline" className="w-full">
              View All Reviews
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
