"use client";

import { Category } from "@/types/category";
import { ChevronRight, ChevronDown, Folder, Edit2, Trash2, List } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: Category;
  level?: number;
  selectedId?: number | null;
  onSelect: (id: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryItem({
  category,
  level = 0,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children_recursive && category.children_recursive.length > 0;
  const isSelected = selectedId === category.id;

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors",
          isSelected ? "bg-primary-50 text-primary-700" : "hover:bg-gray-100"
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "p-0.5 rounded hover:bg-gray-200 transition-colors",
              !hasChildren && "invisible"
            )}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <Folder className={cn("h-4 w-4 flex-shrink-0", isSelected ? "text-primary-600" : "text-gray-400")} />
          <span className="truncate text-sm font-medium">{category.name}</span>
          {(category as any).tasks_count !== undefined && (
            <span className="text-[10px] text-gray-400 font-normal">
              ({(category as any).tasks_count})
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onSelect(category.id)}>
            <List className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onEdit(category)}>
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600" onClick={() => onDelete(category.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {category.children_recursive!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
