import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Cake, Gift, Mail, MessageSquare } from "lucide-react";
import { dashboardData } from "../model/mock-data";

export function UpcomingEvents() {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-0 border-gray-100 border-b">
        <CardTitle className="p-6 font-semibold text-gray-900 text-lg">
          Upcoming Events & Celebrations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {dashboardData.upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="hover:bg-gray-50 p-4 border border-gray-200 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                {event.type === "birthday" ? (
                  <Cake className="w-5 h-5 text-pink-600" />
                ) : (
                  <Gift className="w-5 h-5 text-green-600" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {event.name}
                  </p>
                  <p className="text-gray-600 text-sm">{event.department}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{event.date}</span>
                {event.type === "anniversary" && (
                  <Badge variant="outline" className="text-xs">
                    {event.years} years
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            <Mail className="mr-2 w-4 h-4" />
            Send Birthday Wishes
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageSquare className="mr-2 w-4 h-4" />
            View Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
