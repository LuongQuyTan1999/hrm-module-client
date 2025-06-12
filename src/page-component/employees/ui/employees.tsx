"use client";
import { AddEmployee } from "@/features/add-employee";
import { useState } from "react";
import { employees } from "../model/constants";
import { EmployeeGrid } from "./employee-grid";
import { FiltersSearch } from "./filters-search";

export function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
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

      <EmployeeGrid filteredEmployees={filteredEmployees} />
    </div>
  );
}
