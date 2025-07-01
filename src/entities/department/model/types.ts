export interface Department {
  id: string;
  name: string;
  description?: string;
  color: string;
  managerName?: string;
  managerEmail?: string;
  employeeCount: number;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentFilters {
  search?: string;
  name?: string;
  page?: number;
  limit?: number;
}
