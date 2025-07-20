import { z } from "zod";

export const updatePositionSchema = z.object({
  name: z.string().min(1, "Position title must be at least 2 characters"),
  description: z.string(),
  departmentId: z.string().min(1, "Department is required"),
  level: z.string(),
  minSalary: z.number().min(1, "Minimum salary must be a positive number"),
  maxSalary: z.number().min(1, "Maximum salary must be a positive number"),
});
