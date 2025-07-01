export interface Department {
  id: string;
  name: string;
  description?: string;
  color: string;
  managerName?: string;
  managerEmail?: string;
  employeeCount: number;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentFilters {
  search?: string;
  name?: string;
  page?: number;
  limit?: number;
}

export const departmentColors = [
  { value: "bg-blue-600", label: "Blue", class: "bg-blue-600" },
  { value: "bg-green-600", label: "Green", class: "bg-green-600" },
  { value: "bg-purple-600", label: "Purple", class: "bg-purple-600" },
  { value: "bg-orange-600", label: "Orange", class: "bg-orange-600" },
  { value: "bg-pink-600", label: "Pink", class: "bg-pink-600" },
  { value: "bg-red-600", label: "Red", class: "bg-red-600" },
  { value: "bg-yellow-600", label: "Yellow", class: "bg-yellow-600" },
  { value: "bg-indigo-600", label: "Indigo", class: "bg-indigo-600" },
];
