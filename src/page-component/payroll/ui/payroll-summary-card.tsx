import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Calculator } from "lucide-react";
import { formatCompactCurrency } from "@/shared/lib/format-currency";

export function PayrollSummaryCard() {
  // Mock payroll summary data
  const summary = {
    month: "January, 2025",
    totalEmployees: 156,
    totalGrossSalary: 2847500000, // VND
    totalNetSalary: 2278000000, // VND
    totalDeductions: 569500000, // VND
    totalTaxes: 284750000, // VND
    totalBonuses: 156000000, // VND
    totalOvertimePay: 98500000, // VND
    comparisonMonth: {
      grossSalary: 5.2, // percentage change
      netSalary: 4.8,
      employees: 3,
    },
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-3 h-3 text-red-600" />;
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const deductionRate = (
    (summary.totalDeductions / summary.totalGrossSalary) *
    100
  ).toFixed(1);
  const avgSalaryPerEmployee = summary.totalNetSalary / summary.totalEmployees;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Monthly Payroll Overview
        </CardTitle>
        <p className="text-gray-600 text-sm">{summary.month}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Salary Display */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-4 rounded-lg text-center">
          <div className="mb-1 font-bold text-green-700 text-2xl">
            {formatCompactCurrency(summary.totalNetSalary)}
          </div>
          <div className="text-gray-600 text-sm">Total Net Salary</div>
          <div className="flex justify-center items-center gap-1 mt-1">
            {getChangeIcon(summary.comparisonMonth.netSalary)}
            <span
              className={`text-xs ${getChangeColor(
                summary.comparisonMonth.netSalary
              )}`}
            >
              {summary.comparisonMonth.netSalary > 0 ? "+" : ""}
              {summary.comparisonMonth.netSalary.toFixed(1)}% vs last month
            </span>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 text-sm">
            Salary Breakdown:
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Gross Salary:</span>
              <span className="font-semibold">
                {formatCompactCurrency(summary.totalGrossSalary)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Allowances & Bonuses:</span>
              <span className="font-semibold text-green-600">
                +{formatCompactCurrency(summary.totalBonuses)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Overtime Pay:</span>
              <span className="font-semibold text-blue-600">
                +{formatCompactCurrency(summary.totalOvertimePay)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t text-sm">
              <span className="text-gray-600">Total Deductions:</span>
              <span className="font-semibold text-red-600">
                -{formatCompactCurrency(summary.totalDeductions)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="ml-4 text-gray-600">• Personal Income Tax:</span>
              <span className="text-red-600">
                -{formatCompactCurrency(summary.totalTaxes)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="ml-4 text-gray-600">• Social Insurance:</span>
              <span className="text-red-600">
                -
                {formatCompactCurrency(
                  summary.totalDeductions - summary.totalTaxes
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="gap-4 grid grid-cols-2 pt-4 border-gray-100 border-t">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-blue-700 text-lg">
              {summary.totalEmployees}
            </div>
            <div className="text-blue-600 text-xs">Employees</div>
            <div className="flex justify-center items-center gap-1 mt-1">
              {getChangeIcon(summary.comparisonMonth.employees)}
              <span
                className={`text-xs ${getChangeColor(
                  summary.comparisonMonth.employees
                )}`}
              >
                +{summary.comparisonMonth.employees}
              </span>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-purple-700 text-lg">
              {formatCompactCurrency(avgSalaryPerEmployee)}
            </div>
            <div className="text-purple-600 text-xs">Avg Salary/Employee</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-3 pt-4 border-gray-100 border-t">
          <h4 className="font-medium text-gray-700 text-sm">Key Metrics:</h4>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Deduction Rate:</span>
            <Badge
              variant="outline"
              className={
                parseFloat(deductionRate) <= 25
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }
            >
              {deductionRate}%
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Status:</span>
            <Badge className="bg-green-100 text-green-800">Approved</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 pt-4 border-gray-100 border-t">
          <h4 className="mb-2 font-medium text-gray-700 text-sm">
            Quick Actions:
          </h4>

          <div className="gap-2 grid grid-cols-2">
            <button className="bg-blue-50 hover:bg-blue-100 p-2 rounded-lg text-blue-700 text-xs transition-colors">
              <Calculator className="mx-auto mb-1 w-4 h-4" />
              Calculate Payroll
            </button>
            <button className="bg-green-50 hover:bg-green-100 p-2 rounded-lg text-green-700 text-xs transition-colors">
              <DollarSign className="mx-auto mb-1 w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
