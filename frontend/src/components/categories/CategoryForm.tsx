"use client";

import { useState, useEffect } from "react";
import { Category, StoreCategoryRequest } from "@/types/category";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface CategoryFormProps {
  category?: Category | null;
  allCategories: Category[];
  onSubmit: (data: StoreCategoryRequest) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  serverErrors?: Record<string, string[]>;
}

export default function CategoryForm({
  category,
  allCategories,
  onSubmit,
  onCancel,
  isLoading,
  serverErrors,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<StoreCategoryRequest>({
    name: "",
    parent_id: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        parent_id: category.parent_id,
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const parentOptions = [
    { label: "None (Root)", value: "" },
    ...allCategories
      .filter((c) => c.id !== category?.id) // Prevent self-parenting
      .map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={serverErrors?.name?.[0]}
      />

      <Select
        label="Parent Category"
        options={parentOptions}
        value={formData.parent_id || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            parent_id: e.target.value ? Number(e.target.value) : null,
          })
        }
        error={serverErrors?.parent_id?.[0]}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {category ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
