"use client";
import { Button } from "@/shared/ui/button";
import { Calculator } from "lucide-react";
import { stats, tabs } from "../model/mock-data";
import { Card, CardContent } from "@/shared/ui/card";
import { useState } from "react";
import { OverviewTab } from "./overview-tab";
import { PayrollTable } from "./payroll-table";
import { AdvanceRequestManagement } from "./advance-request-management";
import { CreatePayrollDialog } from "@/features/payroll/create-payroll";

export function PayrollPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "payroll" | "advances" | "reports"
  >("overview");

  return (
    <div className="space-y-6">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="font-semibold text-gray-900 text-2xl">
            Payroll Management
          </h1>
          <p className="mt-1 text-gray-600">
            Calculate and manage employee payroll
          </p>
        </div>

        <CreatePayrollDialog>
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 h-10 text-white">
            <Calculator className="mr-2 w-4 h-4" />
            Calculate Payroll
          </Button>
        </CreatePayrollDialog>
      </div>

      {/* Quick Stats */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-600 text-sm">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{stat.value}</h3>
                    </div>
                    <p className="text-gray-500 text-xs">{stat.description}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => {
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

      {/* Active tab content */}
      {activeTab === "overview" && <OverviewTab />}

      {activeTab === "payroll" && <PayrollTable />}

      {activeTab === "advances" && <AdvanceRequestManagement />}
    </div>
  );
}
