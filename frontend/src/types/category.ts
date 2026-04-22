export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  children_recursive?: Category[];
}

export interface StoreCategoryRequest {
  name: string;
  parent_id?: number | null;
}

export interface UpdateCategoryRequest {
  name: string;
  parent_id?: number | null;
}
