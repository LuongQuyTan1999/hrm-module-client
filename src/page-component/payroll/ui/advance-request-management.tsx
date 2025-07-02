"use client";

import { formatCurrency } from "@/shared/lib/format-currency";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";
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
import { Calendar, CheckCircle, Eye, XCircle } from "lucide-react";
import { useState } from "react";
import { advanceRequests } from "../model/mock-data";

interface AdvanceRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  requestDate: string;
  amount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Paid";
  requestedDate: string;
  urgencyLevel: "High" | "Medium" | "Low";
  currentSalary: number;
  maxAdvanceAmount: number;
  remainingAdvance: number;
}

const getStatusBadge = (status: AdvanceRequest["status"]) => {
  const config = {
    Pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    Approved: { label: "Approved", className: "bg-green-100 text-green-800" },
    Rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
    Paid: { label: "Paid", className: "bg-blue-100 text-blue-800" },
  };
  return (
    <Badge variant="secondary" className={config[status].className}>
      {config[status].label}
    </Badge>
  );
};

const getUrgencyBadge = (urgency: AdvanceRequest["urgencyLevel"]) => {
  const config = {
    High: { label: "Urgent", className: "bg-red-100 text-red-800" },
    Medium: {
      label: "Normal",
      className: "bg-yellow-100 text-yellow-800",
    },
    Low: { label: "Low", className: "bg-green-100 text-green-800" },
  };
  return (
    <Badge variant="secondary" className={config[urgency].className}>
      {config[urgency].label}
    </Badge>
  );
};

const getColumns = (): ColumnDef<AdvanceRequest>[] => {
  return [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.original.employeeName}
          </div>
          <div className="text-gray-600 text-sm">{row.original.employeeId}</div>
          <div className="text-gray-500 text-xs">
            {row.original.department} • {row.original.position}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-lg">
            {formatCurrency(row.original.amount)}
          </div>
          <div className="text-gray-500 text-xs">
            Max: {formatCurrency(row.original.maxAdvanceAmount)}
          </div>
          <div className="text-gray-500 text-xs">
            Remaining: {formatCurrency(row.original.remainingAdvance)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <div className="max-w-48">
          <div className="text-gray-900 text-sm line-clamp-2">
            {row.original.reason}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "urgencyLevel",
      header: "Priority",
      cell: ({ row }) => getUrgencyBadge(row.original.urgencyLevel),
    },
    {
      accessorKey: "requestDate",
      header: "Request Date",
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm">
              {new Date(row.original.requestDate).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className="text-gray-500 text-xs">
            Needed by:{" "}
            {new Date(row.original.requestedDate).toLocaleDateString("en-US")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex justify-center items-center gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </Dialog>

            {request.status === "Pending" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];
};

export function AdvanceRequestManagement() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Get columns for React Table
  const columns = getColumns();

  // React Table setup
  const table = useReactTable({
    data: advanceRequests as AdvanceRequest[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardContent>
        {/* Requests Table */}
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

        {/* Summary Stats */}
        <div className="gap-4 grid grid-cols-4 bg-gray-50 mt-6 p-4 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-yellow-600 text-2xl">2</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600 text-2xl">1</div>
            <div className="text-gray-600 text-sm">Approved</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600 text-2xl">2</div>
            <div className="text-gray-600 text-sm">Urgent</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600 text-lg">
              {formatCurrency(15000000).replace("₫", "").replace(" ", "")}₫
            </div>
            <div className="text-gray-600 text-sm">Total Requested</div>
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
  );
}
