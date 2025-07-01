import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(2, "First name must be at least 2 characters"),
  color: z.string(),
  description: z.string(),
  managerName: z.string().min(2, "Manager name must be at least 2 characters"),
  managerEmail: z.string().email("Invalid email address"),
  // budget: z.number().min(1, "Budget must be a positive number"),
});
// .transform((date) => new Date(date))
