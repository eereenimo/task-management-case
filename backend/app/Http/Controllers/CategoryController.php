<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * List all categories in tree format.
     * Only root categories are fetched; children are eager-loaded recursively.
     */
    public function index(): JsonResponse
    {
        $categories = Category::whereNull('parent_id')
            ->with('childrenRecursive')
            ->withCount('tasks')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $categories]);
    }

    /**
     * Create a new category.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());
        $category->load('parent');

        return response()->json(['data' => $category], 201);
    }

    /**
     * Show a single category with its children.
     */
    public function show(Category $category): JsonResponse
    {
        $category->load(['childrenRecursive', 'parent']);
        $category->loadCount('tasks');

        return response()->json(['data' => $category]);
    }

    /**
     * Update a category.
     */
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());
        $category->load(['childrenRecursive', 'parent']);

        return response()->json(['data' => $category]);
    }

    /**
     * Delete a category.
     * Prevented if the category has children or tasks.
     */
    public function destroy(Category $category): JsonResponse
    {
        // Check for child categories
        if ($category->children()->exists()) {
            return response()->json([
                'message' => 'Cannot delete this category because it has subcategories. Please remove or reassign them first.',
            ], 409);
        }

        // Check for tasks
        if ($category->tasks()->exists()) {
            return response()->json([
                'message' => 'Cannot delete this category because it has tasks. Please remove or reassign them first.',
            ], 409);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
