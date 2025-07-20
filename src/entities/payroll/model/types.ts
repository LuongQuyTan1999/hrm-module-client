import { Employee } from "@/entities/employee";

interface Deductions {
  union_fee: string;
  health_insurance: string;
  social_insurance: string;
  personal_income_tax: string;
  unemployment_insurance: string;
}

interface Bonuses {
  performance: number;
  monthly_project: number;
}

interface Allowances {
  lunch: number;
  phone: number;
  transport: number;
  responsibility: number;
}

export interface PayrollRecord {
  id: string;
  employee: Employee;
  payPeriodStart: string;
  payPeriodEnd: string;
  basicSalary: string;
  allowances: Allowances;
  bonuses: Bonuses;
  deductions: Deductions;
  netSalary: string;
  advanceAmount: string;
  paymentDate: string;
  overtimeSalary: string;
  status: PayrollStatus;
  workingHours: string;
  dailyRate: string;
  overtimeHours: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollDetails {
  employee: Employee;
  payPeriodStart: string;
  payPeriodEnd: string;
  basicSalary: string;
  totalAllowances: string;
  totalBonuses: string;
  totalDeductions: string;
  overtimeSalary: string;
  netSalary: string;
  advanceAmount: string;
  socialInsuranceEmployee: string;
  healthInsuranceEmployee: string;
  unemploymentInsuranceEmployee: string;
  pit: string;
  taxableIncome: string;
  dependents: string;
  status: string;
  details: {
    componentType: string;
    componentName: string;
    amount: string;
    description: string;
  }[];
  createdAt: string;
}

export interface PayrollFilters {
  employeeId?: string;
  periodStart?: string;
  periodEnd?: string;
  page?: number;
  limit?: number;
}

export interface CreatePayrollDto {
  departmentIds: string[];
  periodStart: string;
  periodEnd: string;
}

export enum PayrollStatus {
  Pending = "pending",
  Approved = "approved",
  Paid = "paid",
  Cancelled = "cancelled",
}

export interface AdvanceRequest {
  id: string;
  employee: Employee;
  requestAmount: string;
  requestDate: string;
  status: AdvanceRequestStatus;
  reason: string;
  isUrgent: boolean;
  approver: Employee;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdvanceRequests extends Partial<AdvanceRequest> {}

export enum AdvanceRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  PAID = "paid",
}

export interface AdvanceRequestsFilters {
  employeeId?: string;
  periodStart?: string;
  periodEnd?: string;
  page?: number;
  limit?: number;
}
