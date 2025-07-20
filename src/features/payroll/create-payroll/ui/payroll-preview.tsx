import { PayrollDetails, PayrollPeriod } from "@/entities/payroll";
import { formatCurrency } from "@/shared/lib/format-currency";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { CheckCircle } from "lucide-react";

interface PayrollPreviewProps {
  selectedPeriod?: PayrollPeriod | null;
  payrolls: PayrollDetails[];
}
export function PayrollPreview({
  selectedPeriod,
  payrolls,
}: PayrollPreviewProps) {
  const totalBasicSalary = payrolls.reduce(
    (sum, item) => (sum += Number(item.basicSalary)),
    0
  );

  const totalNetSalary = payrolls.reduce(
    (sum, item) => (sum += Number(item.netSalary)),
    0
  );
  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="py-6 text-center">
        <CheckCircle className="mx-auto mb-4 w-12 h-12 text-green-600" />
        <h3 className="mb-2 font-semibold text-gray-900 text-lg">
          Tính lương hoàn tất!
        </h3>
        <p className="text-gray-600">
          Đã tạo thành công bảng lương cho {payrolls?.length + 1} nhân viên
        </p>
      </div>

      {/* Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kết quả tính toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="gap-4 grid grid-cols-2 text-sm">
            <div>
              <span className="text-gray-600">Kỳ lương:</span>
              <div className="font-medium">{selectedPeriod?.label}</div>
            </div>
            <div>
              <span className="text-gray-600">Số nhân viên:</span>
              <div className="font-medium">{payrolls.length + 1}</div>
            </div>
            <div>
              <span className="text-gray-600">Tổng lương gốc:</span>
              <div className="font-medium">
                {formatCurrency(totalBasicSalary)}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Tổng lương thực:</span>
              <div className="font-medium text-green-600">
                {formatCurrency(totalNetSalary)}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t">
            <span className="text-gray-600 text-sm">Trạng thái:</span>
            <Badge className="bg-green-100 ml-2 text-green-800">
              Đã tạo - Chờ duyệt
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="mb-2 font-medium text-blue-900 text-sm">
          Các bước tiếp theo:
        </h4>
        <ul className="space-y-1 text-blue-800 text-sm">
          <li>1. Kiểm tra và chỉnh sửa bảng lương nếu cần</li>
          <li>2. Duyệt bảng lương để hoàn tất</li>
          <li>3. Xuất phiếu lương cho nhân viên</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Đóng
        </Button>
      </div>
    </div>
  );
}
