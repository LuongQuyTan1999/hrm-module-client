export const LEAVE_TYPES = {
  ANNUAL: "annual",
  SICK: "sick",
  PARENTAL: "parental",
  CASUAL: "casual",
  MATERNITY: "maternity",
  PERSONAL: "personal",
  REMOTE: "remote",
  OTHER: "other",
} as const;

export const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const ATTENDANCE_STATUS = {
  OFFICE: "office",
  REMOTE: "remote",
  LEAVE: "leave",
  ABSENT: "absent",
} as const;

export const TIME_PERIODS = {
  TODAY: "today",
  WEEK: "week",
} as const;

export const LEAVE_CONTENT = {
  [LEAVE_TYPES.ANNUAL]: "Annual Leave",
  [LEAVE_TYPES.SICK]: "Sick Leave",
  [LEAVE_TYPES.PARENTAL]: "Parental Leave",
  [LEAVE_TYPES.CASUAL]: "Casual Leave",
  [LEAVE_TYPES.MATERNITY]: "Maternity Leave",
  [LEAVE_TYPES.PERSONAL]: "Personal Leave",
  [LEAVE_TYPES.REMOTE]: "Remote Work",
  [LEAVE_TYPES.OTHER]: "Other Leave",
} as const;
