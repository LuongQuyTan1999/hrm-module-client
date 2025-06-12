import { AddEmployeeData } from "@/entities/employee";

export const addEmployeeApi = async (
  data: AddEmployeeData
): Promise<AddEmployeeData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newEmployee: AddEmployeeData = {
    ...data,
  };

  return newEmployee;
};
