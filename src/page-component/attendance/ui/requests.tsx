"use client";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function Requests() {
  return (
    <div className="space-y-6">
      {/* Filter by request type */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All requests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All requests</SelectItem>
              <SelectItem value="remote">Remote work</SelectItem>
              <SelectItem value="leave">Leave</SelectItem>
              <SelectItem value="sick">Sick leave</SelectItem>
              <SelectItem value="overtime">Overtime</SelectItem>
              <SelectItem value="schedule">Schedule adjustment</SelectItem>
              <SelectItem value="attendance">Attendance correction</SelectItem>
            </SelectContent>
          </Select>
          <Badge className="bg-red-100 text-red-800">12 new requests</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Approve all
          </Button>
          <Button size="sm" variant="outline">
            Export report
          </Button>
        </div>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        {/* Remote Work Requests */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              🏠 <span>Remote Work</span>
              <Badge className="bg-blue-100 text-blue-800">5 requests</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                name: "Nguyen Thi Kieu Thanh",
                role: "PM/SM",
                duration: "3 days (23-25/12)",
                reason: "Holiday at hometown, can work online",
                urgency: "normal",
              },
              {
                name: "Le Quoc Huy",
                role: "BE",
                duration: "1 week (27/12 - 3/1)",
                reason: "Taking care of sick relative",
                urgency: "high",
              },
              {
                name: "Diep Minh Huy",
                role: "Management",
                duration: "2 days/week (Mon, Wed)",
                reason: "Optimize commute time",
                urgency: "low",
              },
              {
                name: "Vy Thao Nhan",
                role: "FE",
                duration: "1 day (24/12)",
                reason: "Client meeting at home",
                urgency: "normal",
              },
              {
                name: "Nguyen Thanh Vinh",
                role: "MKT",
                duration: "2 days (26-27/12)",
                reason: "Taking care of sick child",
                urgency: "high",
              },
            ].map((request, index) => (
              <div
                key={index}
                className="hover:bg-blue-50 p-3 border border-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-10 h-10 font-semibold text-blue-600 text-sm">
                    {request.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {request.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 text-xs"
                      >
                        {request.role}
                      </Badge>
                      {request.urgency === "high" && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          🔥
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 text-gray-600 text-xs">
                      {request.duration}
                    </p>
                    <p className="bg-gray-50 mb-2 p-2 rounded text-gray-700 text-xs line-clamp-2">
                      {request.reason}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 px-2 h-7 text-white text-xs"
                      >
                        ✓
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 px-2 border-red-600 h-7 text-red-600 text-xs"
                      >
                        ✗
                      </Button>
                      {/* <Button
                        size="sm"
                        variant="ghost"
                        className="px-2 h-7 text-blue-600 text-xs"
                      >
                        View details
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              😴 <span>Leave Requests</span>
              <Badge className="bg-orange-100 text-orange-800">
                4 requests
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                name: "Mai Thi Ngoc",
                role: "FE",
                type: "Annual leave",
                duration: "5 days (28/12 - 3/1)",
                reason: "New Year holiday, planned in advance",
                leaveBalance: "8 days remaining",
              },
              {
                name: "Bui Thi Ngoc Huyen",
                role: "HR",
                type: "Sick leave",
                duration: "2 days (22-23/12)",
                reason: "High fever, medical certificate provided",
                leaveBalance: "12 days remaining",
              },
              {
                name: "Le Thi Thuy Vy",
                role: "MKT",
                type: "Annual leave",
                duration: "1 day (26/12)",
                reason: "Urgent family matter",
                leaveBalance: "5 days remaining",
              },
              {
                name: "Tran Le Thu Thao",
                role: "HR",
                type: "Maternity leave",
                duration: "3 months (1/1 - 31/3)",
                reason: "Maternity leave as per policy",
                leaveBalance: "Maternity leave",
              },
            ].map((request, index) => (
              <div
                key={index}
                className="hover:bg-orange-50 p-3 border border-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-shrink-0 justify-center items-center bg-orange-100 rounded-full w-10 h-10 font-semibold text-orange-600 text-sm">
                    {request.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {request.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 text-xs"
                      >
                        {request.role}
                      </Badge>
                    </div>
                    <p className="mb-1 text-gray-600 text-xs">
                      {request.type} - {request.duration}
                    </p>
                    <p className="bg-gray-50 mb-2 p-2 rounded text-gray-700 text-xs line-clamp-2">
                      {request.reason}
                    </p>
                    <p className="mb-2 text-green-600 text-xs">
                      Leave remaining: {request.leaveBalance}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 px-2 h-7 text-white text-xs"
                      >
                        ✓
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 px-2 border-red-600 h-7 text-red-600 text-xs"
                      >
                        ✗
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
