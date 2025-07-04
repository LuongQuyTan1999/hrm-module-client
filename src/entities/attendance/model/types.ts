import { Employee } from "@/entities/employee";
import {
  ATTENDANCE_STATUS,
  LEAVE_STATUS,
  LEAVE_TYPES,
  TIME_PERIODS,
} from "./constants";

export type LeaveType = (typeof LEAVE_TYPES)[keyof typeof LEAVE_TYPES];
export type LeaveStatus = (typeof LEAVE_STATUS)[keyof typeof LEAVE_STATUS];
export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type TimePeriod = (typeof TIME_PERIODS)[keyof typeof TIME_PERIODS];

export interface LeaveRequest {
  id: string;
  employee: Employee;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface AttendanceCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export interface AttendanceFilters {
  search?: string;
  employeeId?: string;
  status?: LeaveStatus;
  leaveType?: LeaveType;
  page?: number;
  limit?: number;
}
