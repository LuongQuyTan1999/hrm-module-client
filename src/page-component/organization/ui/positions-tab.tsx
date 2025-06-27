import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Award, Briefcase, Target, Users } from "lucide-react";
import { useState } from "react";

const positions = [
  {
    id: 1,
    title: "Software Engineer",
    department: "Engineering",
    level: "Mid-level",
    salaryRange: "$80,000 - $120,000",
    employeeCount: 15,
    openPositions: 3,
    reportsTo: "Senior Software Engineer",
    requirements: [
      "Bachelor's degree in Computer Science",
      "3+ years of programming experience",
      "Proficiency in JavaScript/TypeScript",
      "Experience with React or similar frameworks",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ],
    status: "Active",
    createdDate: "2020-01-15",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    level: "Senior",
    salaryRange: "$120,000 - $160,000",
    employeeCount: 4,
    openPositions: 1,
    reportsTo: "VP of Product",
    requirements: [
      "Bachelor's degree in Business or related field",
      "5+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
    ],
    responsibilities: [
      "Define product strategy and roadmap",
      "Gather and prioritize requirements",
      "Work with engineering and design teams",
      "Analyze market trends and user feedback",
    ],
    status: "Active",
    createdDate: "2020-03-10",
  },
  {
    id: 3,
    title: "Marketing Specialist",
    department: "Marketing",
    level: "Entry-level",
    salaryRange: "$50,000 - $70,000",
    employeeCount: 8,
    openPositions: 2,
    reportsTo: "Marketing Manager",
    requirements: [
      "Bachelor's degree in Marketing or Communications",
      "1+ years of marketing experience",
      "Knowledge of digital marketing tools",
      "Strong written and verbal communication",
    ],
    responsibilities: [
      "Execute marketing campaigns",
      "Create content for social media",
      "Analyze campaign performance",
      "Support lead generation efforts",
    ],
    status: "Active",
    createdDate: "2020-02-20",
  },
  {
    id: 4,
    title: "Sales Representative",
    department: "Sales",
    level: "Mid-level",
    salaryRange: "$60,000 - $90,000 + Commission",
    employeeCount: 12,
    openPositions: 4,
    reportsTo: "Sales Manager",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "2+ years of sales experience",
      "Strong negotiation skills",
      "CRM software experience",
    ],
    responsibilities: [
      "Identify and qualify prospects",
      "Conduct sales presentations",
      "Negotiate contracts and close deals",
      "Maintain customer relationships",
    ],
    status: "Active",
    createdDate: "2020-01-30",
  },
  {
    id: 5,
    title: "HR Specialist",
    department: "Human Resources",
    level: "Mid-level",
    salaryRange: "$65,000 - $85,000",
    employeeCount: 3,
    openPositions: 0,
    reportsTo: "HR Manager",
    requirements: [
      "Bachelor's degree in HR or related field",
      "3+ years of HR experience",
      "Knowledge of employment law",
      "HRCI or SHRM certification preferred",
    ],
    responsibilities: [
      "Manage recruitment and onboarding",
      "Handle employee relations",
      "Administer benefits programs",
      "Ensure compliance with regulations",
    ],
    status: "Active",
    createdDate: "2020-01-10",
  },
];

export const getColumns = (): ColumnDef<any>[] => {
  return [
    {
      header: "Position",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <div>
            <p className="font-medium text-gray-900">{row.getValue("title")}</p>
            <p className="text-gray-500">
              Reports to: {row.original.reportsTo}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        return (
          <div className="">
            <Badge variant="outline" className="border-gray-300">
              {row.getValue("department")}
            </Badge>
          </div>
        );
      },
    },

    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => (
        <div className="">
          <Badge
            className={
              row.getValue("level") === "Senior"
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : row.getValue("level") === "Mid-level"
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-green-100 text-green-800 border-green-200"
            }
          >
            {row.getValue("level")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "salaryRange",
      header: "Salary Range",
      cell: ({ row }) => (
        <div className="">
          <p className="font-medium text-gray-900 text-sm">
            {row.getValue("salaryRange")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "employeeCount",
      header: "Employees",
      cell: ({ row }) => (
        <div className="">
          <p className="font-medium text-gray-900 text-sm">
            {row.getValue("employeeCount")}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "openPositions",
      header: "Open",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-900 text-sm">
            {row.getValue("openPositions")}
          </span>
          {(row.getValue("openPositions") as number) > 0 && (
            <Badge
              variant="outline"
              className="bg-orange-50 border-orange-200 text-orange-700"
            >
              Hiring
            </Badge>
          )}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <div className="flex items-center gap-2">
            {/* <Link href={`/employees/${employee.id}`}> */}
            <Button variant="ghost" size="sm" title="View Profile">
              <Eye className="w-4 h-4" />
            </Button>
            {/* </Link> */}
            <Button variant="ghost" size="sm" title="Edit Employee">
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title="Delete Employee"
              className="hover:bg-red-50 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export function PositionsTab() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = getColumns();

  const table = useReactTable({
    data: positions || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="space-y-6">
      {/* Position Stats */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Briefcase className="mx-auto mb-2 w-8 h-8 text-blue-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.length}
            </p>
            <p className="text-gray-600 text-sm">Total Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 w-8 h-8 text-green-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.reduce((sum, pos) => sum + pos.employeeCount, 0)}
            </p>
            <p className="text-gray-600 text-sm">Filled Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Target className="mx-auto mb-2 w-8 h-8 text-orange-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.reduce((sum, pos) => sum + pos.openPositions, 0)}
            </p>
            <p className="text-gray-600 text-sm">Open Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto mb-2 w-8 h-8 text-purple-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.filter((pos) => pos.level === "Senior").length}
            </p>
            <p className="text-gray-600 text-sm">Senior Roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Positions Table */}
      <div className="w-full">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end items-center space-x-2 py-4">
          <div className="flex-1 text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
