import { Employee, useDeleteEmployee } from "@/entities/employee";
import { CreateAccount } from "@/features/create-account";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  CheckCircle,
  Edit,
  Eye,
  Mail,
  Phone,
  Shield,
  Trash2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export function EmployeeGrid({ employees }: { employees?: Employee[] }) {
  const { mutate: deleteEmployee } = useDeleteEmployee();

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
                <p className="text-gray-600 text-sm truncate capitalize">
                  {employee.user?.role}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Badge
                variant={employee.status === "Active" ? "default" : "secondary"}
                className={
                  employee.status === "Active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }
              >
                {employee.status || "Active"}
              </Badge>
              {employee.user ? (
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
              <span className="font-medium">{employee.department.name}</span> •{" "}
              {employee.address}
            </div>
          </div>

          {/* Actions */}

          <div className="space-y-2">
            <div className="flex gap-2">
              <Link href={`/employees/${employee.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="hover:bg-gray-50 border-gray-300 w-full h-10"
                >
                  <Eye className="mr-2 w-4 h-4" />
                  View
                </Button>
              </Link>

              <Button
                variant="outline"
                size="icon"
                className="hover:bg-gray-50 border-gray-300 w-10 h-10"
                // onClick={() => openEditModal(employee)}
              >
                <Edit className="w-4 h-4" />
              </Button>

              {!employee.user && (
                <CreateAccount employeeId={employee.id}>
                  <Button
                    variant="outline"
                    className="justify-center items-center hover:bg-green-50 border-green-300 h-10 text-green-700"
                  >
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </CreateAccount>
              )}

              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-50 border-red-300 w-10 h-10 text-red-600 hover:text-red-700"
                onClick={() => deleteEmployee(employee.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
