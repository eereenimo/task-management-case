"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { taskApi } from "@/lib/task-api";
import TaskTable from "@/components/tasks/TaskTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import Alert from "@/components/ui/Alert";

interface CategoryTasksPanelProps {
  categoryId: number;
  categoryName: string;
}

export default function CategoryTasksPanel({ categoryId, categoryName }: CategoryTasksPanelProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryTasks() {
      setIsLoading(true);
      setError(null);
      try {
        // Our backend filtering by category_id includes descendants automatically if implemented that way,
        // or we just show tasks for this specific category.
        const res = await taskApi.getAll({ category_id: categoryId });
        setTasks(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryTasks();
  }, [categoryId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Tasks in {categoryName}</h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks found</span>
      </div>

      {error && <Alert variant="error" message={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : tasks.length > 0 ? (
        <TaskTable 
          tasks={tasks} 
          onEdit={() => {}} // Read-only view for now in this panel
          onDelete={() => {}} 
        />
      ) : (
        <EmptyState
          title="No tasks"
          description={`There are no tasks assigned to the ${categoryName} category.`}
        />
      )}
    </div>
  );
}
