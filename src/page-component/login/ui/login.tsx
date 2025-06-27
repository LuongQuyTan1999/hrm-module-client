import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LoginForm } from "@/widgets/login-form";
import { Building2, Shield, Users } from "lucide-react";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="text-center py-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Sign In to Your Account
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Enter your credentials to access the platform
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <LoginForm />

            {/* Demo Accounts Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-medium text-blue-900">
                  Demo Accounts
                </h4>
              </div>
              <div className="space-y-2 text-xs text-blue-800">
                <div>
                  <strong>Admin:</strong> admin@company.com / admin123
                </div>
                <div>
                  <strong>Employee:</strong> sarah.johnson@company.com /
                  employee123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span className="text-blue-600 font-medium">
              Contact your administrator
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Accounts are created by system administrators only
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                Enterprise Security
              </h4>
              <p className="text-xs text-gray-600">
                This system uses enterprise-grade security. All login attempts
                are monitored and logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
