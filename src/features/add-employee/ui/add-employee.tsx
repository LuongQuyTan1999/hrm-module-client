"use client";
import { useGetDepartments } from "@/entities/department";
import { employeeNotifications, useAddEmployee } from "@/entities/employee";
import { useGetPositions } from "@/entities/position";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEmployeeSchema } from "../model/schema";
import { AddEmployeeForm } from "./add-employee-form";

export function AddEmployee() {
  const [open, setOpen] = useState(false);
  const { mutate: addEmployee, isPending } = useAddEmployee();
  const { data: departmentsResponse } = useGetDepartments( {}, { enabled: open } );
  const { data: positionsResponse } = useGetPositions({}, { enabled: open });
  const departments = departmentsResponse?.items || [];
  const positions = positionsResponse?.items || [];

  const form = useForm<z.infer<typeof addEmployeeSchema>>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      departmentId: "",
      positionId: "",
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: z.infer<typeof addEmployeeSchema>) => {
    addEmployee(data, {
      onSuccess: () => {
        employeeNotifications.addSuccess();
        reset();
        setOpen(false);
      },
      onError: (error) => {
        employeeNotifications.addError(error?.message);
      },
    });
  };

  return (
    <AddEmployeeForm
      open={open}
      setOpen={setOpen}
      form={form}
      isPending={isPending}
      departments={departments}
      positions={positions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      reset={reset}
    />
  );
}
