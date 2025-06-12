import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Award, Calendar, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-0 border-gray-100 border-b">
        <CardTitle className="p-6 font-semibold text-gray-900 text-lg">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
          <Link href="/employees">
            <Button variant="outline" className="flex-col gap-2 w-full h-20">
              <Users className="w-6 h-6" />
              <span>View Employees</span>
            </Button>
          </Link>
          <Link href="/leave">
            <Button variant="outline" className="flex-col gap-2 w-full h-20">
              <Calendar className="w-6 h-6" />
              <span>Manage Leave</span>
            </Button>
          </Link>
          <Link href="/performance">
            <Button variant="outline" className="flex-col gap-2 w-full h-20">
              <Award className="w-6 h-6" />
              <span>Performance</span>
            </Button>
          </Link>
          <Link href="/payroll">
            <Button variant="outline" className="flex-col gap-2 w-full h-20">
              <DollarSign className="w-6 h-6" />
              <span>Payroll</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
