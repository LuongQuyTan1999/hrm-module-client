import { Department } from "@/entities/department";

export interface Position {
  id: string;
  name: string;
  description?: string;
  department?: Department;
  minSalary: number;
  maxSalary: number;
  level: string;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PositionFilters {
  search?: string;
  name?: string;
  page?: number;
  limit?: number;
}
