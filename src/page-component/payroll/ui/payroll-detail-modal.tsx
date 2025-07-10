"use client";

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
  employeeId: string;
  employeeName: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

export function PayrollDetailModal({
  employeeId,
  employeeName,
  onEdit,
  children,
}: PayrollDetailModalProps) {
  const [open, setOpen] = useState(false);

  // Mock detailed payroll data
  const payrollDetails = {
    id: employeeId,
    month: "January, 2025",
    period: "01/01/2025 - 31/01/2025",
    status: "Paid",
    paidDate: "2025-01-31",
    generatedDate: "2025-01-30",

    // Employee info
    employee: {
      name: employeeName,
      employeeId: employeeId,
      position: "Senior Developer",
      department: "Engineering",
      level: "Senior",
      joinDate: "2022-01-15",
    },

    // Company info
    company: {
      name: "ABC Technology Co., Ltd",
      address: "123 Nguyen Hue, District 1, HCMC",
      taxNumber: "0123456789",
    },

    // Work details
    work: {
      standardWorkingDays: 22,
      actualWorkingDays: 20,
      absentDays: 2,
      leaveDays: 0,
      holidayDays: 0,
      overtimeHours: 8,
      workingHours: 160,
    },

    // Salary calculation
    salary: {
      baseSalary: 25000000,
      dailyRate: 1136364, // baseSalary / standardWorkingDays
      hourlyRate: 156250, // baseSalary / (standardWorkingDays * 8)
      overtimeRate: 234375, // hourlyRate * 1.5
    },

    // Earnings breakdown
    earnings: {
      basicPay: 22727280, // dailyRate * actualWorkingDays
      overtimePay: 1875000, // overtimeRate * overtimeHours
      allowances: [
        { name: "Lunch Allowance", amount: 500000, taxable: false },
        { name: "Transport Allowance", amount: 200000, taxable: false },
        { name: "Phone Allowance", amount: 100000, taxable: false },
        { name: "Responsibility Allowance", amount: 1000000, taxable: true },
      ],
      bonuses: [
        { name: "Monthly Performance Bonus", amount: 2000000, taxable: true },
        { name: "Project Bonus", amount: 500000, taxable: true },
      ],
    },

    // Deductions breakdown
    deductions: {
      taxes: [{ name: "Personal Income Tax", amount: 2930000, rate: 10 }],
      insurance: [
        { name: "Social Insurance (8%)", amount: 2000000, rate: 8 },
        { name: "Health Insurance (1.5%)", amount: 375000, rate: 1.5 },
        { name: "Unemployment Insurance (1%)", amount: 250000, rate: 1 },
      ],
      others: [{ name: "Union Fee", amount: 50000, rate: null }],
    },

    // Totals
    totals: {
      grossEarnings: 28702280,
      taxableIncome: 26202280,
      totalDeductions: 5605000,
      netSalary: 23097280,
    },
  };

  const totalAllowances = payrollDetails.earnings.allowances.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalBonuses = payrollDetails.earnings.bonuses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalTaxes = payrollDetails.deductions.taxes.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalInsurance = payrollDetails.deductions.insurance.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalOthers = payrollDetails.deductions.others.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payroll Details - {payrollDetails.month}
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
                <div className="font-medium">{payrollDetails.company.name}</div>
                <div className="text-gray-600">
                  {payrollDetails.company.address}
                </div>
                <div className="text-gray-600">
                  Tax No: {payrollDetails.company.taxNumber}
                </div>
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
                  {payrollDetails.employee.name}
                </div>
                <div className="text-gray-600">
                  Employee ID: {payrollDetails.employee.employeeId}
                </div>
                <div className="text-gray-600">
                  {payrollDetails.employee.position}
                </div>
                <div className="text-gray-600">
                  {payrollDetails.employee.department}
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
                  <strong>Pay Period:</strong> {payrollDetails.period}
                </span>
              </div>
              <div className="text-sm">
                <strong>Generated:</strong>{" "}
                {new Date(payrollDetails.generatedDate).toLocaleDateString(
                  "en-US"
                )}
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Paid</Badge>
          </div>

          {/* Working Days Summary */}
          <div>
            <h3 className="mb-3 font-semibold text-lg">
              Attendance Information
            </h3>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-blue-700 text-lg">
                  {payrollDetails.work.actualWorkingDays}
                </div>
                <div className="text-blue-600 text-xs">Working Days</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-red-700 text-lg">
                  {payrollDetails.work.absentDays}
                </div>
                <div className="text-red-600 text-xs">Absent Days</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-purple-700 text-lg">
                  {payrollDetails.work.overtimeHours}
                </div>
                <div className="text-purple-600 text-xs">Overtime Hours</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700 text-lg">
                  {payrollDetails.work.workingHours}
                </div>
                <div className="text-green-600 text-xs">Total Hours</div>
              </div>
            </div>
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
                      {formatCurrency(payrollDetails.earnings.basicPay)}
                    </span>
                  </div>
                  <div className="space-y-1 text-gray-600 text-xs">
                    <div>
                      Monthly Salary:{" "}
                      {formatCurrency(payrollDetails.salary.baseSalary)}
                    </div>
                    <div>
                      Working Days: {payrollDetails.work.actualWorkingDays}/
                      {payrollDetails.work.standardWorkingDays}
                    </div>
                    <div>
                      Daily Rate:{" "}
                      {formatCurrency(payrollDetails.salary.dailyRate)}
                    </div>
                  </div>
                </div>

                {/* Overtime */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overtime Pay</span>
                    <span className="font-semibold">
                      {formatCurrency(payrollDetails.earnings.overtimePay)}
                    </span>
                  </div>
                  <div className="space-y-1 text-gray-600 text-xs">
                    <div>Hours: {payrollDetails.work.overtimeHours} hours</div>
                    <div>
                      Rate: {formatCurrency(payrollDetails.salary.overtimeRate)}
                      /hour (x1.5)
                    </div>
                  </div>
                </div>

                {/* Allowances */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Allowances</span>
                    <span className="font-semibold">
                      {formatCurrency(totalAllowances)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails.earnings.allowances.map(
                      (allowance, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-gray-600">
                            {allowance.name}:
                          </span>
                          <span>{formatCurrency(allowance.amount)}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Bonuses */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Bonuses</span>
                    <span className="font-semibold">
                      {formatCurrency(totalBonuses)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails.earnings.bonuses.map((bonus, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-600">{bonus.name}:</span>
                        <span>{formatCurrency(bonus.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-3 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-green-700">
                    <span>Total Earnings:</span>
                    <span>
                      {formatCurrency(payrollDetails.totals.grossEarnings)}
                    </span>
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
                      -{formatCurrency(totalTaxes)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails.deductions.taxes.map((tax, index) => (
                      <div key={index} className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{tax.name}:</span>
                          <span>-{formatCurrency(tax.amount)}</span>
                        </div>
                        <div className="text-gray-500">
                          Taxable income:{" "}
                          {formatCurrency(payrollDetails.totals.taxableIncome)}{" "}
                          × {tax.rate}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Insurance</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(totalInsurance)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails.deductions.insurance.map(
                      (insurance, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-gray-600">
                            {insurance.name}:
                          </span>
                          <span>-{formatCurrency(insurance.amount)}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Others */}
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Others</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(totalOthers)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {payrollDetails.deductions.others.map((other, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-600">{other.name}:</span>
                        <span>-{formatCurrency(other.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 p-3 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-red-700">
                    <span>Total Deductions:</span>
                    <span>
                      -{formatCurrency(payrollDetails.totals.totalDeductions)}
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
              {formatCurrency(payrollDetails.totals.netSalary)}
            </div>
            <div className="text-green-600 text-sm">
              Transferred on{" "}
              {new Date(payrollDetails.paidDate).toLocaleDateString("en-US")}
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
