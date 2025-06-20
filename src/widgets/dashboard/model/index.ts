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
    name: "Leave Management",
    href: "/leave",
    icon: Calendar,
    description: "Time Off Requests",
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
    name: "Payroll",
    href: "/payroll",
    icon: CreditCard,
    description: "Compensation",
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
