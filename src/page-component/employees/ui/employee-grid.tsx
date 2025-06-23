import { Employee, useGetEmployees } from "@/entities/employee";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Eye, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function EmployeeGrid({ employees }: { employees?: Employee[] }) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {employees?.map((employee) => (
        <div
          key={employee.id}
          className="bg-white hover:shadow-lg p-6 border border-gray-200 rounded-lg transition-shadow duration-150"
        >
          {/* Employee Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {/*    <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${
                    employee.avatarBg || "bg-gray-600"
                  }`}
                >
                  {employee.avatar}
                </div> */}

              <img
                src={
                  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt={"Name"}
                className="border border-gray-300 rounded-full w-12 h-12"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-gray-600 text-sm truncate">
                  {/* {employee.role} */}
                  Admin
                </p>
              </div>
            </div>
            <Badge
              variant={employee.status === "Active" ? "default" : "secondary"}
              className={
                employee.status === "Active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
              }
            >
              {/* {employee.status} */}
              Active
            </Badge>
          </div>

          {/* Employee Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4" />
              <span>{employee.phoneNumber}</span>
            </div>
            <div className="text-gray-600 text-sm">
              <span className="font-medium">{employee.departmentId}</span> •{" "}
              {employee.address}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link href={`/employees/${employee.id}`} className="flex-1">
              <Button
                variant="outline"
                className="hover:bg-gray-50 border-gray-300 w-full h-10"
              >
                <Eye className="mr-2 w-4 h-4" />
                View Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-gray-50 border-gray-300 w-10 h-10"
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
