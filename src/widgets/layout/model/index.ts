import {
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  Grid3X3,
  TrendingUp,
  Users,
} from "lucide-react";

export const mainMenuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Grid3X3,
    description: "Overview",
  },
  {
    name: "Team Directory",
    href: "/employees",
    icon: Users,
    description: "Employee Management",
  },
  {
    name: "Attendance Management",
    href: "/attendance",
    icon: Calendar,
    description: "Time Off Requests",
  },
  {
    name: "Payroll Management",
    href: "/payroll",
    icon: CreditCard,
    description: "Payroll Management",
  },
];

export const moreToolsItems = [
  {
    name: "Performance",
    href: "/performance",
    icon: TrendingUp,
    description: "Reviews & Goals",
  },

  {
    name: "Organization",
    href: "/organization",
    icon: Building2,
    description: "Company Structure",
  },
  {
    name: "Reports",
    href: "/analytics",
    icon: BarChart3,
    description: "Analytics",
  },
];
