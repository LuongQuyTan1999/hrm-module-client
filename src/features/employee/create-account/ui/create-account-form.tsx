import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
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
import { AlertTriangle, Eye, EyeOff, Lock, Save, User } from "lucide-react";
import { useState } from "react";

interface CreateAccountFormProps {
  form: any;
  onSubmit: (data: any) => void;
  handleSubmit: (
    callback: (data: any) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  control: any;
}

const PasswordStrength = ({
  value,
  passwordStrength,
  getPasswordStrengthText,
}: {
  value: string;
  passwordStrength: number;
  getPasswordStrengthText: () => { text: string; color: string };
}) => {
  if (!value) return;
  return (
    <div className="mt-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all ${
              passwordStrength <= 2
                ? "bg-red-500"
                : passwordStrength <= 3
                ? "bg-yellow-500"
                : passwordStrength <= 4
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${(passwordStrength / 5) * 100}%`,
            }}
          ></div>
        </div>
        <span className={`text-xs ${getPasswordStrengthText().color}`}>
          {getPasswordStrengthText().text}
        </span>
      </div>
    </div>
  );
};

export function CreateAccountForm({
  form,
  onSubmit,
  handleSubmit,
  control,
}: CreateAccountFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { watch } = form;

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "text-red-600" };
      case 2:
        return { text: "Weak", color: "text-orange-600" };
      case 3:
        return { text: "Fair", color: "text-yellow-600" };
      case 4:
        return { text: "Good", color: "text-blue-600" };
      case 5:
        return { text: "Strong", color: "text-green-600" };
      default:
        return { text: "", color: "" };
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 pt-0">
        {/* Account Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Account Details
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="John Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Password Setup */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900 text-lg">
              Password Setup
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="h-12"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          calculatePasswordStrength(e.target.value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <PasswordStrength
                    value={watch("password")}
                    getPasswordStrengthText={getPasswordStrengthText}
                    passwordStrength={passwordStrength}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="h-12"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <PasswordStrength
                    value={watch("confirmPassword")}
                    getPasswordStrengthText={getPasswordStrengthText}
                    passwordStrength={passwordStrength}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Account Options */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-lg">
            Account Options
          </h3>

          <div className="space-y-3">
            <FormField
              control={form.control}
              name="sendWelcomeEmail"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">
                      Send welcome email with login instructions
                    </FormLabel>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="requirePasswordChange"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">
                      Require password change on first login
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 w-4 h-4 text-yellow-600" />
            <div>
              <h4 className="mb-1 font-medium text-yellow-800 text-sm">
                Security Notice
              </h4>
              <p className="text-yellow-700 text-xs">
                The employee will receive login credentials via secure email.
                Ensure the email address is correct and belongs to the employee.
              </p>
            </div>
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
                Create Account
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
