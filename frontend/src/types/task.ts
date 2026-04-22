import { Category } from "./category";

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  category_id: number;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface StoreTaskRequest {
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string | null;
  category_id: number;
}

export interface UpdateTaskRequest extends Partial<StoreTaskRequest> {}

export interface TaskFilters {
  search?: string;
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  category_id?: number | '';
  page?: number;
}
