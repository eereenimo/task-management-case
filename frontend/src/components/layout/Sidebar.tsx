"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, FolderTree } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Categories", href: "/categories", icon: FolderTree },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white pt-16 lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-600" : "text-gray-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
