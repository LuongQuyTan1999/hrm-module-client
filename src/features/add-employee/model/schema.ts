import { z } from "zod";

export const addEmployeeSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  departmentId: z.string().min(1, "Department is required"),
  positionId: z.string().min(1, "Position is required"),
  dateOfBirth: z.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  hireDate: z.date(),
  contractType: z.enum(["full-time", "part-time", "contract"]),
  contractStart: z.date(),
  contractEnd: z.date(),
  bankAccount: z
    .string()
    .min(10, "Bank account must be at least 10 characters"),
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  taxCode: z.string().min(5, "Tax code must be at least 5 characters"),
});
// .transform((date) => new Date(date))
