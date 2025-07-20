import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useMemo, useState } from "react";

export interface PayrollPeriod {
  value: string;
  label: string;
  periodStart: string;
  periodEnd: string;
}

const generatePayrollPeriods = (): PayrollPeriod[] => {
  const periods: PayrollPeriod[] = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  for (let month = 1; month <= currentMonth; month++) {
    const monthStr = month.toString().padStart(2, "0");
    const endDate = new Date(currentYear, month, 0);
    const yyyy = endDate.getFullYear();
    const mm = String(month).padStart(2, "0");
    const dd = String(endDate.getDate()).padStart(2, "0");

    const periodEnd = `${yyyy}-${mm}-${dd}`;

    periods.push({
      value: `${currentYear}-${monthStr}`,
      label: `${month}/${currentYear}`,
      periodStart: `${currentYear}-${monthStr}-01`,
      periodEnd: periodEnd,
    });
  }
  return periods.reverse();
};

// Custom Hook
export const usePayrollPeriods = () => {
  const periods = useMemo(() => generatePayrollPeriods(), []);

  const [selectedValue, setSelectedValue] = useState<string>(
    periods[1]?.value || ""
  );

  const selectedPeriod = useMemo(
    () => periods.find((p) => p.value === selectedValue) || null,
    [periods, selectedValue]
  );

  return {
    periods,
    selectedPeriod,
    setSelectedValue,
  };
};
export const PayrollPeriodSelect = ({
  periods,
  selectedValue,
  onValueChange,
}: {
  periods: PayrollPeriod[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <Select value={selectedValue} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn tháng" />
        </SelectTrigger>
        <SelectContent>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
