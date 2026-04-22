"use client";

import { Task } from "@/types/task";
import { Edit2, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";
import { formatDate } from "@/lib/utils";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Task</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                {task.description && (
                  <div className="text-xs text-gray-500 line-clamp-1">{task.description}</div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {task.category?.name || "Uncategorized"}
              </td>
              <td className="px-6 py-4">
                <TaskStatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4">
                <TaskPriorityBadge priority={task.priority} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(task.due_date)}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onDelete(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
