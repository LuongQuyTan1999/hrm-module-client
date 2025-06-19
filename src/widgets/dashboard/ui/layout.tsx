"use client";

import { cn } from "@/shared/lib/tailwind-merge";
import { Button } from "@/shared/ui/button";
import { Bell, HelpCircle, Home, Menu, Search, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { mainMenuItems, moreToolsItems } from "../model";
import { useAuth } from "@/entities/auth";

interface HRMLayoutProps {
  children: React.ReactNode;
}

export function HRMLayout({ children }: HRMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  const renderNavItem = (item: any) => {
    const isActive = isActiveLink(item.href);
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "group flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 text-base",
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon
          className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")}
        />
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-medium truncate",
              isActive ? "text-white" : "text-gray-900"
            )}
          >
            {item.name}
          </p>
          <p
            className={cn(
              "text-sm truncate",
              isActive ? "text-blue-100" : "text-gray-500"
            )}
          >
            {item.description}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden z-40 fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Clean minimal design */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "bg-white border-r border-gray-200"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header - Simple and clean */}
          <div className="flex items-center gap-3 p-6 border-gray-200 border-b">
            <div className="flex justify-center items-center bg-blue-600 rounded-lg w-10 h-10">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-gray-900 text-xl truncate">
                PeopleHR
              </h1>
              <p className="text-gray-500 text-sm truncate">
                Employee Management
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-auto"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation - Clean sections */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Main Menu */}
            <div className="mb-8">
              <h2 className="mb-3 px-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Main Menu
              </h2>
              <div className="space-y-1">
                {mainMenuItems.map(renderNavItem)}
              </div>
            </div>

            {/* More Tools */}
            <div>
              <h2 className="mb-3 px-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                More Tools
              </h2>
              <div className="space-y-1">
                {moreToolsItems.map(renderNavItem)}
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-72">
        {/* Top header - Clean and minimal */}
        <header className="top-0 z-30 sticky flex justify-between items-center bg-white px-6 border-gray-200 border-b h-16">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Breadcrumb - Simple and readable */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Home className="w-4 h-4" />
              <span>/</span>
              <span className="font-medium text-gray-900">Team Directory</span>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-4">
            {/* Search - Large and accessible */}
            <div className="hidden md:block relative">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search employees..."
                className="bg-gray-50 py-2 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-80 text-base"
              />
            </div>

            {/* Notifications - Large touch target */}
            <Button variant="ghost" size="icon" className="relative w-10 h-10">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 font-medium text-white text-xs">
                2
              </span>
            </Button>

            {/* Help button */}
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </Button>

            {/* User profile - Clean and simple */}
            <div className="flex items-center gap-3 pl-4 border-gray-200 border-l">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="John Doe"
                className="border border-gray-300 rounded-full w-8 h-8"
              />
              <div className="hidden md:block">
                <p className="font-medium text-gray-900 text-sm">
                  {user?.name}
                </p>
                <p className="text-gray-500 text-xs uppercase">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content - Clean background */}
        <main className="bg-gray-50 p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
