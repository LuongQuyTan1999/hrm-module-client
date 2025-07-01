"use client";

import {
  Department,
  departmentNotifications,
  useUpdateDepartment,
} from "@/entities/department";
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
import { Building2, Edit, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateDepartmentForm } from "./update-department-form";
import { updateDepartmentSchema } from "../model/schema";

interface UpdateDepartmentProps {
  department: Department;
}

export function UpdateDepartment({ department }: UpdateDepartmentProps) {
  const [open, setOpen] = useState(false);
  const { mutate: updateDepartment, isPending } = useUpdateDepartment();

  const form = useForm<z.infer<typeof updateDepartmentSchema>>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      ...department,
    },
  });

  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    if (open && department) {
      reset({
        ...department,
      });
    }
  }, [open, department, reset]);

  const onSubmit = (data: z.infer<typeof updateDepartmentSchema>) => {
    updateDepartment(
      { id: department.id, department: data },
      {
        onSuccess: () => {
          departmentNotifications.updateSuccess();
          reset();
          setOpen(false);
        },
        onError: (error) => {
          departmentNotifications.updateError(error?.message);
        },
      }
    );
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
        <Button variant="outline" size="sm" title="Edit Department">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Update Department</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Update Department
                </h2>
                <p className="text-gray-600 text-sm">
                  Update {department.name} department information
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <UpdateDepartmentForm
          form={form}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
