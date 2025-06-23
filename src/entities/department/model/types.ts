export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentFilters {
  search?: string;
  name?: string;
  page?: number;
  limit?: number;
}
