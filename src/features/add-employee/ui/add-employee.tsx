"use client";
import { useGetDepartments } from "@/entities/department";
import { employeeNotifications, useAddEmployee } from "@/entities/employee";
import { useGetPositions } from "@/entities/position";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
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

      <DialogContent className="p-0 w-full sm:max-w-[900px] gap-0">
        <DialogHeader>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Employee
                </h2>
                <p className="text-sm text-gray-600">
                  Step {currentStep} of 3 - Complete employee information
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">{currentStep}/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
