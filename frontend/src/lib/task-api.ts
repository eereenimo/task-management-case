import { request } from "./api";
import { Task, StoreTaskRequest, UpdateTaskRequest, TaskFilters } from "@/types/task";
import { PaginatedResponse, ApiResponse } from "@/types/api";

export const taskApi = {
  getAll: (filters: TaskFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.category_id) params.append("category_id", filters.category_id.toString());
    if (filters.page) params.append("page", filters.page.toString());

    return request<PaginatedResponse<Task>>(`/tasks?${params.toString()}`);
  },

  getById: (id: number) => {
    return request<ApiResponse<Task>>(`/tasks/${id}`);
  },

  create: (data: StoreTaskRequest) => {
    return request<ApiResponse<Task>>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: (id: number, data: UpdateTaskRequest) => {
    return request<ApiResponse<Task>>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (id: number) => {
    return request<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
