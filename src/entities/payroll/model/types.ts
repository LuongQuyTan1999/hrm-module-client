import { Employee } from "@/entities/employee";

export interface PayrollRecord {
  id: string;
  employee: Employee;
  payPeriodStart: string;
  payPeriodEnd: string;
  basicSalary: string;
  allowances: string;
  bonuses: string;
  deductions: string;
  netSalary: string;
  advanceAmount: string;
  paymentDate: string;
  overtimeSalary: string;
  status: PayrollStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollFilters {
  employeeId?: string;
  periodStart?: string;
  periodEnd?: string;
  page?: number;
  limit?: number;
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
