"use client";

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
import { CheckCircle, Edit, Eye, Shield, Trash2, UserPlus } from "lucide-react";
import * as React from "react";

import {
  Employee,
  employeeNotifications,
  useDeleteEmployee,
} from "@/entities/employee";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import Link from "next/link";
import { CreateAccount } from "@/features/employee/create-account";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

export const getColumns = (
  handleDeleteEmployee: (id: string, callback?: () => void) => void
): ColumnDef<Employee>[] => {
  return [
    {
      header: "Employee",
      accessorKey: "firstName",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 capitalize">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">
                {row.original.firstName} {row.original.lastName}
              </p>
              <p className="text-gray-500 text-sm">
                ID: {row.original.employeeCode}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "department.name",
      header: "Role & Department",
      cell: ({ row }) => {
        return (
          <div className="">
            <p className="font-medium text-gray-900 capitalize">
              {row.original.user?.role}
            </p>
            <p className="text-gray-500 text-sm">
              {row.original.department.name}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => (
        <div className="lowercase">
          <p className="text-gray-900 text-sm">{row.original.email}</p>
          <p className="text-gray-500 text-sm">{row.original.phoneNumber}</p>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Location",
    },

    {
      accessorKey: "hireDate",
      header: "Join Date",
      cell: ({ row }) => (
        <div className="capitalize">
          <p className="text-gray-900 text-sm">
            {new Date(row.getValue("hireDate")).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1">
          <Badge
            variant={
              row.getValue("status") === "Active" ? "default" : "secondary"
            }
            className={
              row.getValue("status") === "Active"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }
          >
            {row.getValue("status") || "Active"}
          </Badge>
          {row.original.user ? (
            <Badge className="bg-blue-100 border-blue-200 text-blue-800 text-xs">
              <CheckCircle className="mr-1 w-3 h-3" />
              Has Account
            </Badge>
          ) : (
            <Badge variant="outline" className="border-gray-300 text-xs">
              <Shield className="mr-1 w-3 h-3" />
              No Account
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
            <Link href={`/employees/${employee.id}`}>
              <Button variant="ghost" size="sm" title="View Profile">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" title="Edit Employee">
              <Edit className="w-4 h-4" />
            </Button>
            {!employee.user && (
              <CreateAccount employeeId={employee.id}>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Create Account"
                  className="hover:bg-green-50 text-green-600 hover:text-green-700"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </CreateAccount>
            )}

            <ConfirmDialog
              title="Delete Employee"
              description={`Are you sure you want to delete <b>${
                employee.firstName + " " + employee.lastName
              }</b> with role <b style="text-transform: capitalize">${
                employee.user.role
              }</b>?`}
              confirmText="Delete Employee"
              cancelText="Cancel"
              variant="destructive"
              onConfirm={(callback) =>
                handleDeleteEmployee(employee.id, callback)
              }
            >
              <Button
                variant="ghost"
                size="sm"
                title="Delete Employee"
                className="hover:bg-red-50 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </ConfirmDialog>
          </div>
        );
      },
    },
  ];
};

export function EmployeeList({ employees }: { employees?: Employee[] }) {
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteEmployee = (id: string, callback?: () => void) => {
    deleteEmployee(id, {
      onSuccess: () => {
        employeeNotifications.deleteSuccess();
        callback?.();
      },
      onError: (error) => {
        employeeNotifications.deleteError(error.message);
      },
    });
  };

  const columns = getColumns(handleDeleteEmployee);

  const table = useReactTable({
    data: employees || [],
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
  );
}
