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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { Briefcase, DollarSign, Save, User } from "lucide-react";

interface UpdatePositionFormProps {
  form: any;
  onSubmit: (data: any) => void;
  handleSubmit: (
    callback: (data: any) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  control: any;
  departments: { id: string; name: string }[];
  isPending: boolean;
}

const levels = [
  "Entry-level",
  "Mid-level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "VP",
  "C-Level",
];

export function UpdatePositionForm({
  form,
  onSubmit,
  handleSubmit,
  control,
  departments,
  isPending,
}: UpdatePositionFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Position Information
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Software Engineer, Product Manager"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="IT" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="IT" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <DollarSign className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Compensation
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              name="minSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="8000"
                      min={0}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="maxSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="12000"
                      min={0}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
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
                disabled={isPending}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save className="mr-2 w-4 h-4" />
                Update Department
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
