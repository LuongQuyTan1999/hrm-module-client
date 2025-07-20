"use client";
import { useGetDepartments } from "@/entities/department";
import {
  Position,
  positionNotifications,
  useUpdatePosition,
} from "@/entities/position";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePositionSchema } from "../model/schema";
import { UpdatePositionForm } from "./update-position-form";

export function UpdatePosition({
  position,
  children,
}: {
  position: Position;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { data: departmentsResponse } = useGetDepartments(
    {},
    { enabled: open }
  );
  const departments = departmentsResponse?.items || [];
  const { mutate: updatePosition, isPending } = useUpdatePosition();

  const form = useForm<z.infer<typeof updatePositionSchema>>({
    resolver: zodResolver(updatePositionSchema),
    defaultValues: {
      ...position,
    },
  });

  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    if (open && position) {
      reset({
        ...position,
        departmentId: position.department?.id || "",
        minSalary: Number(position.minSalary) || 0,
        maxSalary: Number(position.maxSalary) || 0,
      });
    }
  }, [open, position, reset]);

  const onSubmit = (data: z.infer<typeof updatePositionSchema>) => {
    updatePosition(
      { id: position.id, position: data },
      {
        onSuccess: () => {
          positionNotifications.updateSuccess();
          reset();
          setOpen(false);
        },
        onError: (error) => {
          positionNotifications.updateError(error?.message);
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
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Update Position</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-10 h-10">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Update Position
                </h2>
                <p className="text-gray-600 text-sm">
                  Update {position.name} position in your organization
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <UpdatePositionForm
          form={form}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          departments={departments}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
