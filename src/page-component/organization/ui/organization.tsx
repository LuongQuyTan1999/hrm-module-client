"use client";

import { Button } from "@/shared/ui/button";
import {
  Briefcase,
  Building2,
  FileText,
  Filter,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { DepartmentsTab } from "./departments-tab";
import { PositionsTab } from "./positions-tab";
import { CreateDepartment } from "@/features/create-department";
import { CreatePosition } from "@/features/create-position";

export function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] =
    useState("All Departments");

  const tabs = [
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "positions", label: "Positions", icon: Briefcase },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "departments":
        return <DepartmentsTab />;

      case "positions":
        return <PositionsTab />;

      default:
        return <DepartmentsTab />;
    }
  };

  return (
    <div className="space-y-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="font-semibold text-gray-900 text-2xl">
            Organization Management
          </h1>
          <p className="mt-1 text-gray-600">
            Manage departments, positions, and organizational structure
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="px-4 h-12">
            <FileText className="mr-2 w-4 h-4" />
            Export Report
          </Button>
          {/* <Button
            className="bg-blue-600 hover:bg-blue-700 px-6 h-12 text-white"
            // onClick={() => {
            //   if (activeTab === "departments") {
            //     setShowAddDepartmentModal(true);
            //   } else if (activeTab === "positions") {
            //     setShowAddPositionModal(true);
            //   }
            // }}
          >
            <Plus className="mr-2 w-4 h-4" />
            {activeTab === "departments" ? "Add Department" : "Add Position"}
          </Button> */}
          {activeTab === "departments" ? (
            <CreateDepartment />
          ) : (
            <CreatePosition />
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <div className="flex lg:flex-row flex-col gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-3 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-base"
            />
          </div>

          {/* Department Filter (for positions tab) */}
          {activeTab === "positions" && (
            <div className="relative lg:w-64">
              <select
                value={selectedDepartmentFilter}
                onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
                className="bg-white px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-base appearance-none"
              >
                {/* {departmentNames.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))} */}
              </select>
            </div>
          )}

          {/* Filter button for mobile */}
          <Button variant="outline" className="lg:hidden h-12">
            <Filter className="mr-2 w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-gray-200 border-b rounded-lg">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap flex items-center gap-2 transition-colors rounded-sm ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
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

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
