"use client";
import { employeeNotifications, useAddEmployee } from "@/entities/employee";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEmployeeSchema } from "../model/schema";

export function AddEmployee() {
  const [open, setOpen] = useState(false);
  const { mutate: addEmployee, isPending } = useAddEmployee();

  const form = useForm<z.infer<typeof addEmployeeSchema>>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      firstName: "Luong Quy",
      lastName: "Tan",
      email: "tanquyluong@gmail.com",
      department: "IT",
      position: "FE Developer",
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: z.infer<typeof addEmployeeSchema>) => {
    addEmployee(data, {
      onSuccess: () => {
        employeeNotifications.addSuccess();
      },
      onError: (error) => {
        employeeNotifications.addError(error?.message);
      },
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 h-10 text-white">
          <Plus className="mr-2 w-4 h-4" />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Add a new employee to the system by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <div className="gap-4 grid">
              <div className="gap-3 grid">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild onClick={() => reset()}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
