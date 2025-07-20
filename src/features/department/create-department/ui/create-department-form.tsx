import { departmentColors } from "@/entities/department";
import { Button } from "@/shared/ui/button";
import { DialogFooter } from "@/shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Building2, Save, User } from "lucide-react";

interface CreateDepartmentFormProps {
  form: any;
  onSubmit: (data: any) => void;
  handleSubmit: (
    callback: (data: any) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  control: any;
}

export function CreateDepartmentForm({
  form,
  onSubmit,
  handleSubmit,
  control,
}: CreateDepartmentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Department Information
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Engineering, Marketing"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {departmentColors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => field.onChange(color.value)}
                          className={`w-8 h-8 rounded-lg ${color.class} ${
                            field.value === color.value
                              ? "ring-2 ring-gray-400 ring-offset-2"
                              : ""
                          }`}
                          title={color.label}
                          {...field}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the department's purpose and responsibilities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Manager Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Department Manager
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="managerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.smith@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter className="">
          <div className="pt-6 border-gray-200 border-t w-full">
            <div className="flex justify-end items-center gap-2">
              <Button
                type="submit"
                // disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="mr-2 w-4 h-4" />
                Create Department
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
