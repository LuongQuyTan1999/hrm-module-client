export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  status: "Active" | "On Leave" | "Inactive";
  avatar: string | React.ReactNode;
  avatarBg?: string;
  hasNotification?: boolean;
}

export interface AddEmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  role?: string;
  page?: number;
  limit?: number;
}
