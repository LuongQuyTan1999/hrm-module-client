import { Department } from "@/entities/department";
import { Position } from "@/entities/position";
import { User } from "@/shared/types";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  position: Position;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phoneNumber: string;
  hireDate: Date;
  contractType: string;
  contractStart: Date;
  contractEnd: Date;
  bankAccount: string;
  bankName: string;
  taxCode: string;
  user: User;
  employeeCode: string;
  status: "Active" | "Inactive";
}

export interface AddEmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  positionId: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phoneNumber: string;
  hireDate: Date;
  contractType: string;
  contractStart: Date;
  contractEnd: Date;
  bankAccount: string;
  bankName: string;
  taxCode: string;
}

export interface UpdateEmployeeData extends Partial<AddEmployeeData> {
  id: string;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  role?: string;
  page?: number;
  limit?: number;
}
