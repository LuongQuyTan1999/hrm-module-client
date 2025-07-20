"use client";
import {
  employeeNotifications,
  useCreateAccount,
  useGetEmployee,
} from "@/entities/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAccountSchema } from "../model/schema";
import { CreateAccountForm } from "./create-account-form";

export function CreateAccount({
  employeeId,
  children,
}: {
  employeeId: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { data: employee } = useGetEmployee(employeeId, {
    enabled: open,
  });
  const { mutate: createAccount } = useCreateAccount(employeeId);

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      // email: "",
      sendWelcomeEmail: true,
      requirePasswordChange: true,
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: z.infer<typeof createAccountSchema>) => {
    createAccount(data, {
      onSuccess: () => {
        employeeNotifications.updateSuccess();
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
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 p-0 w-full sm:max-w-[900px]">
        <VisuallyHidden asChild>
          <DialogTitle>Create Account</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <div className="flex justify-between items-center p-6 border-gray-200 border-b">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-xl">
                  Create Account
                </h2>
                <p className="text-gray-600 text-sm">
                  Create login account for {employee?.firstName}{" "}
                  {employee?.lastName}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-scroll">
          <div className="p-6">
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
              <h3 className="mb-2 font-medium text-blue-900">
                Employee Information
              </h3>
              <div className="gap-3 grid grid-cols-1 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-blue-700">Name:</span>
                  <span className="ml-2 font-medium text-blue-900">
                    {employee?.firstName} {employee?.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Role:</span>
                  <span className="ml-2 font-medium text-blue-900">
                    {"Admin"}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Department:</span>
                  <span className="ml-2 font-medium text-blue-900">
                    {employee?.department.name}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Employee ID:</span>
                  <span className="ml-2 font-medium text-blue-900">
                    {employee?.employeeCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CreateAccountForm
            form={form}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
