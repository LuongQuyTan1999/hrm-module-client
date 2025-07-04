"use client";
import { TIME_PERIODS, TimePeriod } from "@/entities/attendance";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { CheckCircle, Users } from "lucide-react";
import { useState } from "react";
import { statusCards } from "../model/mock";
import { LeaveRequests } from "./leave-requests";
import { LiveStatus } from "./live-status";

export function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"live" | "approvals">("live");
  const [searchTerm, setSearchTerm] = useState("");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TIME_PERIODS.TODAY);

  const managerTabs = [
    { id: "live", label: "Live Status", icon: Users },
    { id: "approvals", label: "Approval Requests", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="gap-4 grid md:grid-cols-4">
        {statusCards.map((card) => (
          <Card key={card.title} className={`${card.bgColor} border-0`}>
            <CardContent className="px-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Select
            value={timePeriod}
            onValueChange={(value) => setTimePeriod(value as TimePeriod)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TIME_PERIODS.TODAY}>📅 Today</SelectItem>
              <SelectItem value={TIME_PERIODS.WEEK}>📊 This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="max-w-md">
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên, ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Date Display */}
          <div className="bg-gray-50 px-3 py-2 rounded-lg text-gray-600 text-sm">
            {timePeriod === "today" && "Hôm nay - 24/12/2024"}
            {timePeriod === "week" && "18/12 - 24/12/2024"}
          </div>
        </div>
      </div>

      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {managerTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === "live" && <LiveStatus timePeriod={timePeriod} />}

      {activeTab === "approvals" && <LeaveRequests />}
    </div>
  );
}
