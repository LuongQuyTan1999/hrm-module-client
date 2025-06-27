"use client";
import { useGetEmployees } from "@/entities/employee";
import { AddEmployee } from "@/features/add-employee";
import { useState } from "react";
import { employees } from "../model/mock-data";
import { EmployeeGrid } from "./employee-grid";
import { EmployeeList } from "./employee-list";
import { FiltersSearch } from "./filters-search";

export function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      employee.department.id === departmentFilter;
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
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "list" ? (
        <EmployeeList employees={data?.items} />
      ) : (
        <EmployeeGrid employees={data?.items} />
      )}
    </div>
  );
}
