"use client";

import { Category } from "@/types/category";
import CategoryItem from "./CategoryItem";
import EmptyState from "@/components/ui/EmptyState";

interface CategoryTreeProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTree({
  categories,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: CategoryTreeProps) {
  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories"
        description="Create categories to organize your tasks."
      />
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          selectedId={selectedId}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
