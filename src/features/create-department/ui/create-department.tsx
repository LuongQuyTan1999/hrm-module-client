"use client";
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
import { Building2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateDepartmentForm } from "./create-department-form";
import { createDepartmentSchema } from "../model/schema";

export function CreateDepartment() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      color: "bg-blue-600", // Default color
      description: "",
      managerName: "",
      managerEmail: "",
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: z.infer<typeof createDepartmentSchema>) => {
    console.log("Form submitted with data:", data);
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
          Add Department
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Create Department</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Create Department
                </h2>
                <p className="text-gray-600 text-sm">
                  Create a new department in your organization
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <CreateDepartmentForm
          form={form}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
        />
      </DialogContent>
    </Dialog>
  );
}
