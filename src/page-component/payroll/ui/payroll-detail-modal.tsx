"use client";

import { useGetPayroll } from "@/entities/payroll";
import { formatDateEnUs } from "@/shared/lib/date";
import { formatCurrency } from "@/shared/lib/format-currency";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";
import {
  Building,
  Calendar,
  DollarSign,
  Download,
  Edit,
  User,
} from "lucide-react";
import { useState } from "react";

interface PayrollDetailModalProps {
  payrollId: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

export function PayrollDetailModal({
  onEdit,
  children,
  payrollId,
}: PayrollDetailModalProps) {
  const [open, setOpen] = useState(false);

  const { data: payrollDetails } = useGetPayroll(payrollId, { enabled: open });

  const totalInsurance =
    Number(payrollDetails?.unemploymentInsuranceEmployee) +
      Number(payrollDetails?.healthInsuranceEmployee) +
      Number(payrollDetails?.socialInsuranceEmployee) || 0;

  // const totalTaxes = deductions?.personal_income_tax || 0;

  const totalOthers =
    Number(payrollDetails?.advanceAmount) +
    Number(
      payrollDetails?.details.filter(
        (details) => details.componentType === "deduction"
      )[0].amount
    );

  const totalEarnings =
    Number(payrollDetails?.basicSalary) +
    Number(payrollDetails?.overtimeSalary) +
    Number(payrollDetails?.totalBonuses) +
    Number(payrollDetails?.totalAllowances);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payroll Details - {payrollDetails?.payPeriodStart}
            </DialogTitle>
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="mr-2 w-4 h-4" />
                  Edit
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="mr-2 w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Information */}
          <div className="gap-6 grid md:grid-cols-2">
            {/* Company Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Building className="w-4 h-4" />
                Company Information
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-medium">ABC Technology Co., Ltd</div>
                <div className="text-gray-600">
                  123 Nguyen Hue, District 1, HCMC
                </div>
                <div className="text-gray-600">Tax No: 0123456789</div>
              </div>
            </div>

            {/* Employee Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <User className="w-4 h-4" />
                Employee Information
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-medium">
                  {payrollDetails?.employee.firstName}{" "}
                  {payrollDetails?.employee.lastName}
                </div>
                <div className="text-gray-600">
                  Employee ID: {payrollDetails?.employee.employeeCode}
                </div>
                <div className="text-gray-600">
                  {payrollDetails?.employee.position.name}
                </div>
                <div className="text-gray-600">
                  {payrollDetails?.employee.department.name}
                </div>
              </div>
            </div>
          </div>

          {/* Period and Status */}
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Pay Period:</strong>{" "}
                  {formatDateEnUs(payrollDetails?.payPeriodStart || "")} -{" "}
                  {formatDateEnUs(payrollDetails?.payPeriodEnd || "")}
                </span>
              </div>
              <div className="text-sm">
                <strong>Generated:</strong>{" "}
                {formatDateEnUs(payrollDetails?.createdAt || "")}
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {payrollDetails?.status}
            </Badge>
          </div>

          {/* Working Days Summary */}
          <div>
            <h3 className="mb-3 font-semibold text-lg">
              Attendance Information
            </h3>
            {/* <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-blue-700 text-lg">
                  {payrollDetails?.workingHours}
                </div>
                <div className="text-blue-600 text-xs">Working Days</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-red-700 text-lg">
                  {payrollDetails?.workingHours}
                </div>
                <div className="text-red-600 text-xs">Absent Days</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-purple-700 text-lg">
                  {payrollDetails?.overtimeHours}
                </div>
                <div className="text-purple-600 text-xs">Overtime Hours</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700 text-lg">
                  {payrollDetails?.workingHours}
                </div>
                <div className="text-green-600 text-xs">Total Hours</div>
              </div>
            </div> */}
          </div>

          <Separator />

          {/* Salary Calculation Details */}
          <div className="gap-6 grid md:grid-cols-2">
            {/* Earnings */}
            <div>
              <h3 className="mb-3 font-semibold text-green-700 text-lg">
                Earnings (+)
              </h3>
              <div className="space-y-3">
                {/* Basic Pay */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Basic Salary</span>
                    <span className="font-semibold">
                      {formatCurrency(Number(payrollDetails?.basicSalary))}
                    </span>
                  </div>
                  {/* <div className="space-y-1 text-gray-600 text-xs">
                    <div>
                      Working Days:{" "}
                      {(Number(payrollDetails?.workingHours) / 8).toFixed()}/22
                    </div>
                  </div> */}
                </div>

                {/* Overtime */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overtime Pay</span>
                    <span className="font-semibold">
                      {formatCurrency(Number(payrollDetails?.overtimeSalary))}
                    </span>
                  </div>
                  {/* <div className="space-y-1 text-gray-600 text-xs">
                    <div>Hours: {payrollDetails?.overtimeHours} hours</div>
                    <div>
                      Rate: {formatCurrency(Number(payrollDetails?.dailyRate))}
                      /hour (x1.5)
                    </div>
                  </div> */}
                </div>

                {/* Allowances */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Allowances</span>
                    <span className="font-semibold">
                      {formatCurrency(Number(payrollDetails?.totalAllowances))}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails?.details
                      .filter((data) => data.componentType === "allowance")
                      .map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-gray-600 capitalize">
                            {item.componentName}:
                          </span>
                          <span>{formatCurrency(Number(item.amount))}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bonuses */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Bonuses</span>
                    <span className="font-semibold">
                      {formatCurrency(Number(payrollDetails?.totalBonuses))}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails?.details
                      .filter((data) => data.componentType === "bonus")
                      .map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-gray-600 capitalize">
                            {item.componentName}:
                          </span>
                          <span>{formatCurrency(Number(item.amount))}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-green-50 p-3 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-green-700">
                    <span>Total Earnings:</span>
                    <span>{formatCurrency(totalEarnings)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="mb-3 font-semibold text-red-700 text-lg">
                Deductions (-)
              </h3>
              <div className="space-y-3">
                {/* Taxes */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Taxes</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(Number(payrollDetails?.pit))}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Personal Income Tax:
                        </span>
                        <span>
                          -{formatCurrency(Number(payrollDetails?.pit))}
                        </span>
                      </div>
                      {/* <div className="text-gray-500">
                        Taxable income:{" "}
                        {formatCurrency(Number(payrollDetails?.taxableIncome))}{" "}
                        × 10%
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Insurance</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(Number(totalInsurance))}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Social insurance:</span>
                      <span>
                        -
                        {formatCurrency(
                          Number(payrollDetails?.socialInsuranceEmployee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Health insurance:</span>
                      <span>
                        -
                        {formatCurrency(
                          Number(payrollDetails?.healthInsuranceEmployee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">
                        Unemployment insurance:
                      </span>
                      <span>
                        -
                        {formatCurrency(
                          Number(payrollDetails?.unemploymentInsuranceEmployee)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Others */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Others</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(Number(totalOthers))}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails?.details
                      .filter(
                        (details) => details.componentType === "deduction"
                      )
                      .map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-gray-600">
                            {item.componentName}:
                          </span>
                          <span>
                            -{formatCurrency(Number(item.amount || 0))}
                          </span>
                        </div>
                      ))}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Advance amount:</span>
                      <span>
                        -{formatCurrency(Number(payrollDetails?.advanceAmount))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-3 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-red-700">
                    <span>Total Deductions:</span>
                    <span>
                      -{formatCurrency(Number(payrollDetails?.totalDeductions))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Result */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-6 rounded-lg text-center">
            <div className="mb-2 text-gray-600 text-sm">Net Salary</div>
            <div className="mb-2 font-bold text-green-700 text-4xl">
              {formatCurrency(Number(payrollDetails?.netSalary))}
            </div>
            <div className="text-green-600 text-sm">
              Transferred on{" "}
              {/* {new Date(payrollDetails?.paidDate).toLocaleDateString("en-US")} */}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button className="flex-1">
              <Download className="mr-2 w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
