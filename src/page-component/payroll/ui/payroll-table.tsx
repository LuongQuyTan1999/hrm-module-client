"use client";

import {
  PayrollPeriodSelect,
  PayrollRecord,
  PayrollStatus,
  useGetPayrolls,
  usePayrollPeriods,
} from "@/entities/payroll";
import { formatCurrency } from "@/shared/lib/format-currency";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Ban,
  CheckCircle,
  DollarSign,
  Edit,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PayrollDetailModal } from "./payroll-detail-modal";

const getStatusBadge = (status: PayrollRecord["status"]) => {
  const statusConfig = {
    [PayrollStatus.Pending]: {
      label: "Draft",
      className: "bg-gray-100 text-gray-800",
    },
    [PayrollStatus.Approved]: {
      label: "Approved",
      className: "bg-blue-100 text-blue-800",
    },
    [PayrollStatus.Paid]: {
      label: "Paid",
      className: "bg-green-100 text-green-800",
    },
    [PayrollStatus.Cancelled]: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800",
    },
  };

  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
};

const getColumns = (): ColumnDef<PayrollRecord>[] => {
  return [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.original.employee.firstName} {row.original.employee.lastName}
          </div>
          <div className="text-gray-600 text-sm">
            {row.original.employee.position.name}
          </div>
          <div className="text-gray-500 text-xs">
            {row.original.employee.department.name}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "baseSalary",
      header: "Basic Salary",
      cell: ({ row }) => (
        <span className="font-medium">
          {formatCurrency(Number(row.original.basicSalary))}
        </span>
      ),
    },
    {
      accessorKey: "overtimePay",
      header: "Overtime",
      cell: ({ row }) => (
        <span
          className={
            Number(row.original.overtimeSalary) > 0
              ? "text-blue-600 font-medium"
              : "text-gray-400"
          }
        >
          {Number(row.original.overtimeSalary) > 0
            ? formatCurrency(Number(row.original.overtimeSalary))
            : "--"}
        </span>
      ),
    },
    {
      accessorKey: "bonuses",
      header: "Bonuses",
      cell: ({ row }) => (
        <span
          className={
            Number(row.original.bonuses) > 0
              ? "text-green-600 font-medium"
              : "text-gray-400"
          }
        >
          {Number(row.original.bonuses) > 0
            ? formatCurrency(Number(row.original.bonuses))
            : "--"}
        </span>
      ),
    },
    {
      accessorKey: "deductions",
      header: "Deductions",
      cell: ({ row }) => (
        <span className="text-red-600">
          -{formatCurrency(Number(row.original.deductions))}
        </span>
      ),
    },
    {
      accessorKey: "netSalary",
      header: "Net Salary",
      cell: ({ row }) => (
        <span className="font-bold text-gray-900">
          {formatCurrency(Number(row.original.netSalary))}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: "quickActions",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <div className="flex gap-1">
            {record.status === PayrollStatus.Pending && (
              <Button
                size="sm"
                variant="outline"
                title="Mark as Approved"
                className="hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700 text-xs"
              >
                <CheckCircle className="w-3 h-3" />
              </Button>
            )}
            {record.status === PayrollStatus.Approved && (
              <Button
                size="sm"
                variant="outline"
                title="Mark as Paid"
                className="hover:bg-green-50 border-green-200 text-green-600 hover:text-green-700 text-xs"
              >
                <DollarSign className="w-3 h-3" />
              </Button>
            )}
            {(record.status === PayrollStatus.Pending ||
              record.status === PayrollStatus.Approved) && (
              <Button
                size="sm"
                variant="outline"
                title="Mark as Cancelled"
                className="hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 text-xs"
              >
                <Ban className="w-3 h-3" />
              </Button>
            )}

            <PayrollDetailModal payrollId={record.id}>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-gray-50 border-gray-300 text-xs"
              >
                <Eye className="w-3 h-3" />
              </Button>
            </PayrollDetailModal>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-gray-50 border-gray-300 text-xs"
            >
              <Edit className="w-3 h-3" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export function PayrollTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { periods, selectedPeriod, setSelectedValue } = usePayrollPeriods();

  const filters = useMemo(
    () => ({
      periodStart: selectedPeriod?.periodStart,
      periodEnd: selectedPeriod?.periodEnd,
    }),
    [selectedPeriod]
  );

  const { data } = useGetPayrolls(filters);

  const payrolls = useMemo(() => data?.items || [], [data]);

  const columns = useMemo(() => getColumns(), []);

  const table = useReactTable({
    data: payrolls,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualFiltering: true,
  });

  const totalBasicSalary = payrolls.reduce(
    (sum, record) => sum + Number(record.basicSalary),
    0
  );

  const totalBonuses = payrolls.reduce(
    (sum, record) => sum + Number(record.bonuses),
    0
  );

  const totalNetSalary = payrolls.reduce(
    (sum, record) => sum + Number(record.netSalary),
    0
  );
  const totalDeductions = payrolls.reduce(
    (sum, record) => sum + Number(record.deductions),
    0
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          {/* Filters */}
          <div className="flex md:flex-row flex-col md:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
              <Input
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedPeriod && (
              <PayrollPeriodSelect
                periods={periods}
                selectedValue={selectedPeriod.value}
                onValueChange={setSelectedValue}
              />
            )}

            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-40">
                <Filter className="mr-2 w-4 h-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
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

          {/* Summary Row */}
          <div className="bg-gray-50 mt-4 p-4 rounded-lg">
            <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-sm">
              <div>
                <span className="text-gray-600">Total Basic Salary:</span>
                <div className="font-bold">
                  {formatCurrency(totalBasicSalary)}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Total Bonuses:</span>
                <div className="font-bold">{formatCurrency(totalBonuses)}</div>
              </div>
              <div>
                <span className="text-gray-600">Total Deductions:</span>
                <div className="font-bold text-red-600">
                  -{formatCurrency(totalDeductions)}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Total Net Salary:</span>
                <div className="font-bold text-lg">
                  {formatCurrency(totalNetSalary)}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
