"use client";

import { useState, useEffect } from "react";
import { Task, StoreTaskRequest, TaskStatus, TaskPriority } from "@/types/task";
import { Category } from "@/types/category";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface TaskFormProps {
  task?: Task | null;
  categories: Category[];
  onSubmit: (data: StoreTaskRequest) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  serverErrors?: Record<string, string[]>;
}

export default function TaskForm({ task, categories, onSubmit, onCancel, isLoading, serverErrors }: TaskFormProps) {
  const [formData, setFormData] = useState<StoreTaskRequest>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
    category_id: categories[0]?.id || 0,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        due_date: task.due_date ? new Date(task.due_date).toISOString().split("T")[0] : "",
        category_id: task.category_id,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={serverErrors?.title?.[0]}
      />
      
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
            serverErrors?.description && "border-red-500 focus:ring-red-500"
          )}
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {serverErrors?.description && <p className="text-xs text-red-500">{serverErrors.description[0]}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={[
            { label: "To Do", value: "todo" },
            { label: "In Progress", value: "in_progress" },
            { label: "Done", value: "done" },
          ]}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          error={serverErrors?.status?.[0]}
        />
        <Select
          label="Priority"
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
          error={serverErrors?.priority?.[0]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData.due_date || ""}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          error={serverErrors?.due_date?.[0]}
        />
        <Select
          label="Category"
          options={categories.map(c => ({ label: c.name, value: c.id }))}
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
          error={serverErrors?.category_id?.[0]}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
