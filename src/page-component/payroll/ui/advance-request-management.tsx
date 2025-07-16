"use client";

import {
  AdvanceRequest,
  advanceRequestsNotifications,
  AdvanceRequestStatus,
  UpdateAdvanceRequests,
  useGetAllAdvanceRequests,
  useUpdateAdvanceRequests,
} from "@/entities/payroll";
import { formatCurrency } from "@/shared/lib/format-currency";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
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
import { Calendar, CheckCircle, DollarSign, XCircle } from "lucide-react";
import { useState } from "react";

const getStatusBadge = (status: AdvanceRequest["status"]) => {
  const config = {
    [AdvanceRequestStatus.PENDING]: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    [AdvanceRequestStatus.APPROVED]: {
      label: "Approved",
      className: "bg-green-100 text-green-800",
    },
    [AdvanceRequestStatus.REJECTED]: {
      label: "Rejected",
      className: "bg-red-100 text-red-800",
    },
    [AdvanceRequestStatus.PAID]: {
      label: "Paid",
      className: "bg-blue-100 text-blue-800",
    },
  };
  return (
    <Badge variant="secondary" className={config[status].className}>
      {config[status].label}
    </Badge>
  );
};

const getUrgencyBadge = (urgency: AdvanceRequest["isUrgent"]) => {
  if (urgency)
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        Urgent
      </Badge>
    );

  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800">
      Normal
    </Badge>
  );
};

const getColumns = (
  handleUpdateAdvance: (id: string, body: UpdateAdvanceRequests) => void
): ColumnDef<AdvanceRequest>[] => {
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
            {row.original.employee.employeeCode}
          </div>
          <div className="text-gray-500 text-xs">
            {row.original.employee.department.name} •{" "}
            {row.original.employee.position.name}
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
            {formatCurrency(Number(row.original.requestAmount))}
          </div>
          {/* <div className="text-gray-500 text-xs">
            Max: {formatCurrency(row.original.maxAdvanceAmount)}
          </div>
          <div className="text-gray-500 text-xs">
            Remaining: {formatCurrency(row.original.remainingAdvance)}
          </div> */}
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
      cell: ({ row }) => getUrgencyBadge(row.original.isUrgent),
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
            {new Date(row.original.dueDate).toLocaleDateString("en-US")}
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
            {request.status === AdvanceRequestStatus.PENDING && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700"
                  onClick={() =>
                    handleUpdateAdvance(row.original.id, {
                      status: AdvanceRequestStatus.APPROVED,
                    })
                  }
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() =>
                    handleUpdateAdvance(row.original.id, {
                      status: AdvanceRequestStatus.REJECTED,
                    })
                  }
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </>
            )}

            {request.status === AdvanceRequestStatus.APPROVED && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700"
                  onClick={() =>
                    handleUpdateAdvance(row.original.id, {
                      status: AdvanceRequestStatus.PAID,
                    })
                  }
                >
                  <DollarSign className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </Dialog> */}
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

  const { data } = useGetAllAdvanceRequests();
  const advanceRequests = data?.items || [];

  const { mutate: updateAdvance } = useUpdateAdvanceRequests();

  const handleUpdateAdvance = (id: string, body: UpdateAdvanceRequests) => {
    updateAdvance(
      { id, body },
      {
        onSuccess: () => {
          advanceRequestsNotifications.updateSuccess();
        },
        onError: (error) => {
          advanceRequestsNotifications.deleteError(error?.message);
        },
      }
    );
  };

  const columns = getColumns(handleUpdateAdvance);

  // React Table setup
  const table = useReactTable({
    data: advanceRequests,
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

  const pendingRequest = advanceRequests.filter(
    (ad) => ad.status === AdvanceRequestStatus.PENDING
  ).length;

  const approvedRequest = advanceRequests.filter(
    (ad) =>
      ad.status === AdvanceRequestStatus.APPROVED ||
      ad.status === AdvanceRequestStatus.PAID
  ).length;

  const urgentRequest = advanceRequests.filter((ad) => ad.isUrgent).length;
  const totalRequestAmount = advanceRequests.reduce(
    (sum, ad) => (sum += Number(ad.requestAmount)),
    0
  );

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
            <div className="font-bold text-yellow-600 text-2xl">
              {pendingRequest}
            </div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600 text-2xl">
              {approvedRequest}
            </div>
            <div className="text-gray-600 text-sm">Approved</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600 text-2xl">
              {urgentRequest}
            </div>
            <div className="text-gray-600 text-sm">Urgent</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600 text-lg">
              {formatCurrency(totalRequestAmount)
                .replace("₫", "")
                .replace(" ", "")}
              ₫
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
