import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(2, "First name must be at least 2 characters"),
  color: z.string(),
  description: z.string(),
  managerName: z.string().min(2, "Manager name must be at least 2 characters"),
  managerEmail: z.string().email("Invalid email address"),
});
// .transform((date) => new Date(date))
