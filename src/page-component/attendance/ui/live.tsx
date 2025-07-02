import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { employees, getWeeklyEmployeeData } from "../model/mock";

export function Live({ timePeriod }: { timePeriod: "today" | "week" }) {
  return (
    <>
      {timePeriod === "today" && (
        <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {employees.map((employee) => (
            <Card
              key={employee.id}
              className="gap-0 hover:shadow-md p-4 transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-semibold text-sm">
                  {employee.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {employee.name}
                  </h4>
                  <p className="text-gray-500 text-xs">({employee.role})</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Current:</span>
                  <Badge
                    className={
                      employee.currentStatus === "office"
                        ? "bg-blue-100 text-blue-800"
                        : employee.currentStatus === "remote"
                        ? "bg-orange-100 text-orange-800"
                        : employee.currentStatus === "off"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {employee.currentStatus === "office"
                      ? "🏢 Office"
                      : employee.currentStatus === "remote"
                      ? "🏠 Remote"
                      : employee.currentStatus === "off"
                      ? "😴 On Leave"
                      : "✅ Active"}
                  </Badge>
                </div>

                {/* Daily Schedule Timeline */}
                <div className="space-y-1">
                  <div className="mb-2 text-gray-600 text-xs">
                    Today's Schedule:
                  </div>
                  {employee.schedule.map((slot, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="font-mono text-gray-500">
                        {slot.time}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          slot.status === "office"
                            ? "bg-blue-50 text-blue-700"
                            : slot.status === "remote"
                            ? "bg-orange-50 text-orange-700"
                            : slot.status === "off"
                            ? "bg-gray-50 text-gray-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {slot.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-gray-100 border-t text-gray-500 text-xs">
                  <span>Total time:</span>
                  <span className="font-medium text-gray-700">
                    {employee.workTime}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {timePeriod === "week" && (
        <div className="space-y-6">
          {/* Week Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview (18/12 - 24/12)</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="gap-4 grid md:grid-cols-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-blue-600 text-2xl">38.5h</div>
                  <div className="text-blue-700 text-sm">Average/person</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-green-600 text-2xl">94%</div>
                  <div className="text-green-700 text-sm">Attendance rate</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-orange-600 text-2xl">145h</div>
                  <div className="text-orange-700 text-sm">Remote work</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-red-600 text-2xl">23</div>
                  <div className="text-red-700 text-sm">Leave days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Employee Grid */}
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
            {getWeeklyEmployeeData().map((employee) => (
              <Card
                key={employee.id}
                className="gap-0 hover:shadow-md p-4 transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-semibold text-sm">
                    {employee.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {employee.name}
                    </h4>
                    <p className="text-gray-500 text-xs">({employee.role})</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">This week:</span>
                    <span className="font-medium">
                      {employee.totalWeekHours}
                    </span>
                  </div>

                  {/* Week Pattern - Simple Icons */}
                  <div className="flex gap-1">
                    {employee.weekSchedule.map((dayData) => (
                      <div key={dayData.day} className="flex-1 text-center">
                        <div className="mb-1 text-gray-500 text-xs">
                          {dayData.day}
                        </div>
                        <div
                          className={`h-8 rounded text-xs flex items-center justify-center ${
                            dayData.hours === "0h"
                              ? "bg-gray-100 text-gray-400"
                              : dayData.morning === "office" ||
                                dayData.afternoon === "office"
                              ? "bg-blue-100 text-blue-800"
                              : dayData.morning === "remote" ||
                                dayData.afternoon === "remote"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {dayData.hours === "0h"
                            ? "😴"
                            : dayData.morning === "office" ||
                              dayData.afternoon === "office"
                            ? "🏢"
                            : dayData.morning === "remote" ||
                              dayData.afternoon === "remote"
                            ? "🏠"
                            : "😴"}
                        </div>
                        <div className="mt-1 text-gray-500 text-xs">
                          {dayData.hours}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Week Stats */}
                  <div className="flex justify-between pt-2 border-gray-100 border-t text-gray-500 text-xs">
                    <span>Avg/day:</span>
                    <span className="font-medium">
                      {Math.round(
                        (parseFloat(employee.totalWeekHours.replace("h", "")) /
                          5) *
                          10
                      ) / 10}
                      h
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
