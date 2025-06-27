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
import { Briefcase, Building2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePositionForm } from "./create-position-form";
import { createPositionSchema } from "../model/schema";
import { useGetDepartments } from "@/entities/department";

export function CreatePosition() {
  const [open, setOpen] = useState(false);
  const { data: departmentsResponse } = useGetDepartments(
    {},
    { enabled: open }
  );
  const departments = departmentsResponse?.items || [];

  const form = useForm<z.infer<typeof createPositionSchema>>({
    resolver: zodResolver(createPositionSchema),
    defaultValues: {
      name: "",
      departmentId: "",
      level: "Entry-level",
      minSalary: 0,
      maxSalary: 0,
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: z.infer<typeof createPositionSchema>) => {
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
          Add Position
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Create Position</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-10 h-10">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Create Position
                </h2>
                <p className="text-gray-600 text-sm">
                  Create a new position in your organization
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <CreatePositionForm
          form={form}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          departments={departments}
        />
      </DialogContent>
    </Dialog>
  );
}
