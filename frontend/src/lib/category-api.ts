import { request } from "./api";
import { Category, StoreCategoryRequest, UpdateCategoryRequest } from "@/types/category";
import { ApiResponse } from "@/types/api";

export const categoryApi = {
  getAll: () => {
    return request<ApiResponse<Category[]>>("/categories");
  },

  getTree: () => {
    // Backend index returns the tree structure by default in our implementation
    return request<ApiResponse<Category[]>>("/categories");
  },

  getById: (id: number) => {
    return request<ApiResponse<Category>>(`/categories/${id}`);
  },

  create: (data: StoreCategoryRequest) => {
    return request<ApiResponse<Category>>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: (id: number, data: UpdateCategoryRequest) => {
    return request<ApiResponse<Category>>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (id: number) => {
    return request<void>(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};
