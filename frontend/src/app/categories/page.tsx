"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, StoreCategoryRequest } from "@/types/category";
import { categoryApi } from "@/lib/category-api";
import CategoryTree from "@/components/categories/CategoryTree";
import CategoryForm from "@/components/categories/CategoryForm";
import CategoryTasksPanel from "@/components/categories/CategoryTasksPanel";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Alert from "@/components/ui/Alert";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | undefined>();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setServerErrors(undefined);
  };

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await categoryApi.getTree();
      setCategories(res.data);
      
      const flatten = (cats: Category[]): Category[] => {
        return cats.reduce((acc: Category[], cat) => {
          acc.push(cat);
          if (cat.children_recursive) acc.push(...flatten(cat.children_recursive));
          return acc;
        }, []);
      };
      setFlatCategories(flatten(res.data));
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This will fail if there are subcategories or tasks assigned.")) return;
    
    setIsActionLoading(true);
    try {
      await categoryApi.delete(id);
      setFeedback({ type: "success", message: "Category deleted successfully" });
      if (activeCategoryId === id) setActiveCategoryId(null);
      fetchCategories();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to delete category" });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleSubmit = async (data: StoreCategoryRequest) => {
    setIsActionLoading(true);
    setServerErrors(undefined);
    try {
      if (selectedCategory) {
        await categoryApi.update(selectedCategory.id, data);
        setFeedback({ type: "success", message: "Category updated successfully" });
      } else {
        await categoryApi.create(data);
        setFeedback({ type: "success", message: "Category created successfully" });
      }
      handleModalClose();
      fetchCategories();
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
      } else {
        setFeedback({ type: "error", message: err.message || "Failed to save category" });
      }
    } finally {
      setIsActionLoading(false);
    }
  };

  const activeCategory = flatCategories.find(c => c.id === activeCategoryId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">Organize your tasks into hierarchical folders.</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
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

      {error && <Alert variant="error" message={error} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Tree View</h3>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <CategoryTree
              categories={categories}
              selectedId={activeCategoryId}
              onSelect={setActiveCategoryId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Details & Tasks</h3>
          {activeCategory ? (
            <CategoryTasksPanel
              categoryId={activeCategory.id}
              categoryName={activeCategory.name}
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-center">
              <p className="text-sm text-gray-500">Select a category from the tree to view its tasks.</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedCategory ? "Edit Category" : "New Category"}
      >
        <CategoryForm
          category={selectedCategory}
          allCategories={flatCategories}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          isLoading={isActionLoading}
          serverErrors={serverErrors}
        />
      </Modal>
    </div>
  );
}
