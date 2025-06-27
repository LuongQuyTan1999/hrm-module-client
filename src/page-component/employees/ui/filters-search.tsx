import { Employee } from "@/entities/employee";
import { Button } from "@/shared/ui/button";
import { ChevronDown, Filter, Grid3X3, List, Search } from "lucide-react";

export function FiltersSearch({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  employees,
  filteredEmployees,
  viewMode,
  setViewMode,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (dept: string) => void;
  employees: Employee[];
  filteredEmployees: Employee[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}) {
  const departments = [
    "All Departments",
    ...Array.from(new Set(employees.map((emp) => emp.department.id))),
  ];

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg">
      <div className="flex lg:flex-row flex-col gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-3 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-base"
          />
        </div>

        {/* Department Filter */}
        <div className="relative lg:w-64">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-white px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-base appearance-none"
          >
            {departments.map((dept, idx) => (
              <option key={idx + 1} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ChevronDown className="top-1/2 right-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer font-semibold ${
              viewMode === "grid"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer font-semibold ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>

        {/* Filter button for mobile */}
        <Button variant="outline" className="lg:hidden h-12">
          <Filter className="mr-2 w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600 text-sm">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
        <div className="text-gray-500 text-sm">
          View: {viewMode === "grid" ? "Grid Cards" : "Table List"}
        </div>
      </div>
    </div>
  );
}
