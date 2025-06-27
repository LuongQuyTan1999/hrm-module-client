"use client";
import { useGetDepartments } from "@/entities/department";
import { employeeNotifications, useAddEmployee } from "@/entities/employee";
import { useGetPositions } from "@/entities/position";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEmployeeSchema } from "../model/schema";
import { AddEmployeeForm } from "./add-employee-form";

export function AddEmployee() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: addEmployee, isPending } = useAddEmployee();
  const { data: departmentsResponse } = useGetDepartments(
    {},
    { enabled: open }
  );
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
  const { handleSubmit, reset, control, ...rest } = form;

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
    <Dialog
      open={open}
      onOpenChange={() => {
        reset();
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 h-10 text-white">
          <Plus className="mr-2 w-4 h-4" />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Add Employee</DialogTitle>
        </VisuallyHidden>
        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Add New Employee
                </h2>
                <p className="text-gray-600 text-sm">
                  Step {currentStep} of 3 - Complete employee information
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-gray-200 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-600 text-sm">Progress</span>
            <span className="text-gray-600 text-sm">{currentStep}/3</span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <AddEmployeeForm
          form={form}
          isPending={isPending}
          departments={departments}
          positions={positions}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </DialogContent>
    </Dialog>
  );
}
