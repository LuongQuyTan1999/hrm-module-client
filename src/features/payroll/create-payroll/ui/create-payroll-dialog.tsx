"use client";

import { useGetDepartments } from "@/entities/department";
import {
  PayrollDetails,
  payrollNotifications,
  useCreatePayrolls,
  usePayrollPeriods,
} from "@/entities/payroll";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Calculator } from "lucide-react";
import { useState } from "react";
import { DepartmentSelect } from "./department-select";
import { PayrollPreview } from "./payroll-preview";

interface GeneratePayrollDialogProps {
  children?: React.ReactNode;
}

export function CreatePayrollDialog({ children }: GeneratePayrollDialogProps) {
  const [open, setOpen] = useState(false);

  const { periods, selectedPeriod, setSelectedValue } = usePayrollPeriods();
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([
    "all",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [payrolls, setPayrolls] = useState<PayrollDetails[]>([]);

  const { mutate: createPayrolls } = useCreatePayrolls();
  const { data } = useGetDepartments(
    {},
    {
      enabled: open,
    }
  );
  const departments = data?.items || [];
  const handleDepartmentChange = (departmentId: string, checked: boolean) => {
    if (departmentId === "all") {
      setSelectedDepartments(checked ? ["all"] : []);
    } else {
      setSelectedDepartments((prev) => {
        const newSelection = checked
          ? [...prev.filter((id) => id !== "all"), departmentId]
          : prev.filter((id) => id !== departmentId);

        if (newSelection.length === departments.length) {
          return ["all"];
        }

        return newSelection;
      });
    }
  };

  const handleGeneratePayroll = async () => {
    setIsGenerating(true);

    const departmentIds = selectedDepartments.includes("all")
      ? departments.map((dep) => dep.id)
      : selectedDepartments;

    createPayrolls(
      {
        departmentIds,
        periodStart: selectedPeriod?.periodStart || "",
        periodEnd: selectedPeriod?.periodEnd || "",
      },
      {
        onSuccess: (data) => {
          payrollNotifications.addSuccess();
          setIsGenerating(false);
          setPayrolls(data.payrolls);
        },
        onError: (error) => {
          payrollNotifications.updateError(error?.message);
        },
        onSettled: () => {
          setIsGenerating(false);
        },
      }
    );
  };

  const getSelectedEmployeeCount = () => {
    if (selectedDepartments.includes("all")) {
      return departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
    }
    return departments
      .filter((dept) => selectedDepartments.includes(dept.id))
      .reduce((sum, dept) => sum + dept.employeeCount, 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[900px] max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tính lương tự động
          </DialogTitle>
        </DialogHeader>

        {payrolls?.length === 0 ? (
          <DepartmentSelect
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedValue={setSelectedValue}
            handleDepartmentChange={handleDepartmentChange}
            selectedDepartments={selectedDepartments}
            departments={departments}
            handleGeneratePayroll={handleGeneratePayroll}
            isGenerating={isGenerating}
            employeeCount={getSelectedEmployeeCount()}
          />
        ) : (
          <PayrollPreview payrolls={payrolls} selectedPeriod={selectedPeriod} />
        )}
      </DialogContent>
    </Dialog>
  );
}
