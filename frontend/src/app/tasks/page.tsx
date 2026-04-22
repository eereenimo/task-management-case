"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskFilters as FilterType, StoreTaskRequest } from "@/types/task";
import { Category } from "@/types/category";
import { taskApi } from "@/lib/task-api";
import { categoryApi } from "@/lib/category-api";
import TaskTable from "@/components/tasks/TaskTable";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskForm from "@/components/tasks/TaskForm";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import Alert from "@/components/ui/Alert";
import { Plus } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });
  const [filters, setFilters] = useState<FilterType>({ page: 1 });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | undefined>();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setServerErrors(undefined);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [taskRes, catRes] = await Promise.all([
        taskApi.getAll(filters),
        categoryApi.getAll(),
      ]);
      setTasks(taskRes.data);
      setPagination({
        current: taskRes.meta.current_page,
        last: taskRes.meta.last_page,
        total: taskRes.meta.total,
      });
      // Flatten tree for dropdown
      const flatten = (cats: Category[]): Category[] => {
        return cats.reduce((acc: Category[], cat) => {
          acc.push(cat);
          if (cat.children_recursive) acc.push(...flatten(cat.children_recursive));
          return acc;
        }, []);
      };
      setCategories(flatten(catRes.data));
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    setIsActionLoading(true);
    try {
      await taskApi.delete(id);
      setFeedback({ type: "success", message: "Task deleted successfully" });
      fetchData();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to delete task" });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleSubmit = async (data: StoreTaskRequest) => {
    setIsActionLoading(true);
    setServerErrors(undefined);
    try {
      if (selectedTask) {
        await taskApi.update(selectedTask.id, data);
        setFeedback({ type: "success", message: "Task updated successfully" });
      } else {
        await taskApi.create(data);
        setFeedback({ type: "success", message: "Task created successfully" });
      }
      handleModalClose();
      fetchData();
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
      } else {
        setFeedback({ type: "error", message: err.message || "Failed to save task" });
      }
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500">Manage your daily tasks and productivity.</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {feedback && (
        <Alert
          variant={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback(null)}
          className="animate-in fade-in slide-in-from-top-2"
        />
      )}

      <TaskFilters
        filters={filters}
        categories={categories}
        onFilterChange={setFilters}
      />

      {error && <Alert variant="error" message={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : tasks.length > 0 ? (
        <div className="space-y-4">
          <TaskTable
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={pagination.current}
            lastPage={pagination.last}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </div>
      ) : (
        <EmptyState
          title="No tasks found"
          description={filters.search ? "Try adjusting your search or filters." : "Get started by creating your first task."}
          action={!filters.search && (
            <Button onClick={handleCreate} variant="outline">Create Task</Button>
          )}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedTask ? "Edit Task" : "New Task"}
      >
        <TaskForm
          task={selectedTask}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          isLoading={isActionLoading}
          serverErrors={serverErrors}
        />
      </Modal>
    </div>
  );
}
