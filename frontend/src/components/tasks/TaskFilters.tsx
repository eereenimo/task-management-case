"use client";

import { TaskFilters as FilterType, TaskPriority, TaskStatus } from "@/types/task";
import { Category } from "@/types/category";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Search } from "lucide-react";

interface TaskFiltersProps {
  filters: FilterType;
  categories: Category[];
  onFilterChange: (filters: FilterType) => void;
}

export default function TaskFilters({ filters, categories, onFilterChange }: TaskFiltersProps) {
  const statusOptions = [
    { label: "All Statuses", value: "" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ];

  const priorityOptions = [
    { label: "All Priorities", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...categories.map(c => ({ label: c.name, value: c.id })),
  ];

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-sm border border-gray-200 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative">
        <Input
          placeholder="Search tasks..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value, page: 1 })}
          className="pl-9"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      <Select
        options={statusOptions}
        value={filters.status || ""}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TaskStatus | "", page: 1 })}
      />

      <Select
        options={priorityOptions}
        value={filters.priority || ""}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TaskPriority | "", page: 1 })}
      />

      <Select
        options={categoryOptions}
        value={filters.category_id || ""}
        onChange={(e) => onFilterChange({ ...filters, category_id: e.target.value ? Number(e.target.value) : "", page: 1 })}
      />

      <div className="flex items-end">
        <button
          onClick={() => onFilterChange({ page: 1 })}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
