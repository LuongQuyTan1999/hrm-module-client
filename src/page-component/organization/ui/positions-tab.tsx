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
import {
  Position,
  useDeletePosition,
  useGetPositions,
} from "@/entities/position";
import { UpdatePosition } from "@/features/update-position";
import { departmentNotifications } from "@/entities/department";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

export const getColumns = (
  handleDeletePosition: (id: string, callback?: () => void) => void
): ColumnDef<any>[] => {
  return [
    {
      header: "Position",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <div>
            <p className="font-medium text-gray-900">{row.getValue("name")}</p>
            <p className="text-gray-500">{row.original.description || "N/A"}</p>
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
              {row.original.department.name}
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
      accessorKey: "minSalary",
      header: "Salary Range",
      cell: ({ row }) => (
        <div className="">
          <p className="font-medium text-gray-900 text-sm">
            ${Number(row.original.minSalary).toLocaleString()} - $
            {Number(row.original.maxSalary).toLocaleString()}
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
        const position = row.original;

        return (
          <div className="flex items-center gap-2">
            {/* <Link href={`/employees/${employee.id}`}> */}
            <Button variant="ghost" size="sm" title="View Profile">
              <Eye className="w-4 h-4" />
            </Button>
            {/* </Link> */}

            <UpdatePosition position={position}>
              <Button variant="ghost" size="sm" title="Edit Employee">
                <Edit className="w-4 h-4" />
              </Button>
            </UpdatePosition>

            <ConfirmDialog
              title="Delete Position"
              description={`Are you sure you want to delete <b>${position.name}</b>? This action cannot be undone and will affect all employees in this position.`}
              confirmText="Delete Position"
              cancelText="Cancel"
              variant="destructive"
              onConfirm={(callback) =>
                handleDeletePosition(position.id, callback)
              }
            >
              <Button
                variant="ghost"
                size="sm"
                title="Delete Position"
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

export function PositionsTab({ activeTab }: { activeTab: string }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { mutate: deletePosition } = useDeletePosition();
  const { data, isLoading } = useGetPositions(
    {},
    { enabled: activeTab === "positions" }
  );
  const positions = data?.items || [];

  const handleDeletePosition = (id: string, callback?: () => void) => {
    deletePosition(id, {
      onSuccess: () => {
        departmentNotifications.deleteSuccess();
        callback?.();
      },
      onError: (error) => {
        departmentNotifications.deleteError(error?.message);
      },
    });
  };

  const columns = getColumns(handleDeletePosition);

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
          <CardContent className="text-center">
            <Briefcase className="mx-auto mb-2 w-8 h-8 text-blue-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.length}
            </p>
            <p className="text-gray-600 text-sm">Total Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="text-center">
            <Users className="mx-auto mb-2 w-8 h-8 text-green-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {positions.reduce((sum, pos) => sum + pos.employeeCount, 0)}
            </p>
            <p className="text-gray-600 text-sm">Filled Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="text-center">
            <Target className="mx-auto mb-2 w-8 h-8 text-orange-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {/* {positions.reduce((sum, pos) => sum + pos.openPositions, 0)} */}
              0
            </p>
            <p className="text-gray-600 text-sm">Open Positions</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="text-center">
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
