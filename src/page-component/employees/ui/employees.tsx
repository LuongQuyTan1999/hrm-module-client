"use client";
import { AddEmployee } from "@/features/add-employee";
import { useState } from "react";
import { employees } from "../model/mock-data";
import { EmployeeGrid } from "./employee-grid";
import { FiltersSearch } from "./filters-search";
import { useGetEmployees } from "@/entities/employee";
import { LayoutGrid, LayoutList, List } from "lucide-react";
import { cn } from "@/shared/lib/tailwind-merge";
import { EmployeeList } from "./employee-list";

export function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState("grid");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      employee.departmentId === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const { data, isLoading } = useGetEmployees({
    page: 1,
    limit: 10,
  });

  return (
    <div className="space-y-6 mx-auto max-w-7xl">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="font-semibold text-gray-900 text-2xl">
            Team Directory
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your team members and view their profiles
          </p>
        </div>
        <AddEmployee />
      </div>

      <FiltersSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        employees={employees}
        filteredEmployees={filteredEmployees}
      />

      <div className="flex items-center gap-2 justify-end mb-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            className={cn(
              "p-2 rounded-md hover:bg-white hover:shadow-sm transition-colors cursor-pointer",
              {
                "bg-white shadow-sm": viewMode === "list",
              }
            )}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4 text-gray-600" />
          </button>
          <button
            className={cn(
              "p-2 rounded-md hover:bg-white hover:shadow-sm transition-colors cursor-pointer",
              {
                "bg-white shadow-sm": viewMode === "grid",
              }
            )}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <EmployeeList employees={data?.items} />
      ) : (
        <EmployeeGrid employees={data?.items} />
      )}
    </div>
  );
}
