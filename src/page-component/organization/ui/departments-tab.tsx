import {
  departmentNotifications,
  useDeleteDepartment,
  useGetDepartments,
} from "@/entities/department";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import {
  Building2,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

export function DepartmentsTab({ activeTab }: { activeTab: string }) {
  const { mutate: deleteDepartment } = useDeleteDepartment();

  const { data, isLoading } = useGetDepartments(
    {},
    {
      enabled: activeTab === "departments",
    }
  );

  const handleDeleteDepartment = (id: string) => {
    deleteDepartment(id, {
      onSuccess: () => {
        departmentNotifications.deleteSuccess();
      },
      onError: (error) => {
        departmentNotifications.deleteError(error.message);
      },
    });
  };

  const departments = data?.items || [];

  return (
    <div className="space-y-6">
      {/* Department Stats */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Building2 className="mx-auto mb-2 w-8 h-8 text-blue-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {departments.length}
            </p>
            <p className="text-gray-600 text-sm">Total Departments</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 w-8 h-8 text-green-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </p>
            <p className="text-gray-600 text-sm">Total Employees</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto mb-2 w-8 h-8 text-purple-600" />
            <p className="font-bold text-gray-900 text-2xl">
              ${(0 / 1000000).toFixed(1)}M
            </p>
            <p className="text-gray-600 text-sm">Total Budget</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto mb-2 w-8 h-8 text-orange-600" />
            <p className="font-bold text-gray-900 text-2xl">
              {Math.round(
                departments.reduce((sum, dept) => sum + dept.employeeCount, 0) /
                  departments.length
              )}
            </p>
            <p className="text-gray-600 text-sm">Avg Team Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card
            key={department.id}
            className="hover:shadow-lg border border-gray-200 transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 ${department.color} rounded-lg flex items-center justify-center`}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {department.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {department.employeeCount} employees
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="mb-4 text-gray-600 text-sm">
                {department.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Manager:</span>
                  <span className="font-medium">{department.managerName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">
                    ${(10000 / 1000000).toFixed(1)}M
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">
                    {new Date(department.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-gray-200 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 w-4 h-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => openEditDepartmentModal(department)}
                    title="Edit Department"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`mailto:${department.managerEmail}`, "_blank")
                    }
                    title="Email Manager"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="hover:bg-red-50 text-red-600 hover:text-red-700"
                    title="Delete Department"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
