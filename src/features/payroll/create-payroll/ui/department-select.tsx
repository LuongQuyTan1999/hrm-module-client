import { Department } from "@/entities/department";
import {
  PayrollPeriod,
  PayrollPeriodSelect,
  usePayrollPeriods,
} from "@/entities/payroll";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { AlertCircle, Calculator, Users } from "lucide-react";

interface DepartmentSelectProps {
  periods: PayrollPeriod[];
  selectedPeriod: PayrollPeriod | null;
  setSelectedValue: (value: string) => void;
  employeeCount: number;
  handleDepartmentChange: (departmentId: string, checked: boolean) => void;
  selectedDepartments: string[];
  departments: Department[];
  handleGeneratePayroll: () => void;
  isGenerating: boolean;
}
export function DepartmentSelect({
  periods,
  selectedPeriod,
  setSelectedValue,
  selectedDepartments,
  handleDepartmentChange,
  departments,
  handleGeneratePayroll,
  isGenerating,
  employeeCount,
}: DepartmentSelectProps) {
  return (
    <div className="space-y-6">
      {selectedPeriod && (
        <PayrollPeriodSelect
          periods={periods}
          selectedValue={selectedPeriod.value}
          onValueChange={setSelectedValue}
        />
      )}

      <div className="space-y-2">
        <label className="font-medium text-gray-700 text-sm">
          Chọn phòng ban
        </label>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-departments"
                  checked={selectedDepartments.includes("all")}
                  onCheckedChange={(checked) =>
                    handleDepartmentChange("all", checked as boolean)
                  }
                />
                <label
                  htmlFor="all-departments"
                  className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
                >
                  Tất cả phòng ban (
                  {departments.reduce(
                    (sum, dept) => sum + dept.employeeCount,
                    0
                  )}{" "}
                  nhân viên)
                </label>
              </div>

              <div className="space-y-2 pt-3 border-t">
                {departments.map((department) => (
                  <div
                    key={department.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={department.id}
                        checked={
                          selectedDepartments.includes(department.id) ||
                          selectedDepartments.includes("all")
                        }
                        onCheckedChange={(checked) =>
                          handleDepartmentChange(
                            department.id,
                            checked as boolean
                          )
                        }
                        disabled={selectedDepartments.includes("all")}
                      />
                      <label
                        htmlFor={department.id}
                        className="peer-disabled:opacity-70 text-sm leading-none peer-disabled:cursor-not-allowed"
                      >
                        {department.name}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {department.employeeCount} NV
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900 text-sm">Tổng kết</span>
          </div>
          <div className="text-blue-800 text-sm">
            <p>
              Kỳ lương: <strong>{selectedPeriod?.label}</strong>
            </p>
            <p>
              Số nhân viên: <strong>{employeeCount}</strong>
            </p>
            <p>
              Ước tính thời gian xử lý: <strong>2-3 phút</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <div className="flex items-start gap-2 bg-amber-50 p-3 border border-amber-200 rounded-lg">
        <AlertCircle className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
        <div className="text-amber-800 text-sm">
          <p className="mb-1 font-medium">Lưu ý quan trọng:</p>
          <ul className="space-y-1 text-xs">
            <li>• Hệ thống sẽ tự động tính toán dựa trên dữ liệu chấm công</li>
            <li>• Các khoản thưởng/phạt đặc biệt cần được thêm thủ công</li>
            <li>• Bảng lương có thể được chỉnh sửa sau khi tạo</li>
            <li>• Quá trình này không thể hoàn tác</li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          // onClick={() => onOpenChange(false)}
          className="flex-1"
        >
          Hủy bỏ
        </Button>
        <Button
          onClick={handleGeneratePayroll}
          disabled={isGenerating || employeeCount === 0}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <div className="mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
              Đang tính toán...
            </>
          ) : (
            <>
              <Calculator className="mr-2 w-4 h-4" />
              Bắt đầu tính lương
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
