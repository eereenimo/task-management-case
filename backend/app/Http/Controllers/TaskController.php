<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * List tasks with filtering, search, and pagination.
     *
     * Query params:
     *  - status:      filter by exact status (todo, in_progress, done)
     *  - priority:    filter by exact priority (low, medium, high)
     *  - category_id: filter by category and all its descendants
     *  - search:      search in title and description
     *  - per_page:    items per page (default 10)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::with('category');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        // Filter by category (including all descendant categories)
        if ($request->filled('category_id')) {
            $category = Category::find($request->input('category_id'));

            if ($category) {
                $categoryIds = $category->getDescendantIds();
                $query->whereIn('category_id', $categoryIds);
            }
        }

        // Search in title and description
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Order by latest first
        $query->orderBy('created_at', 'desc');

        // Paginate (default 10 per page)
        $perPage = $request->input('per_page', 10);
        $tasks = $query->paginate($perPage);

        return response()->json($tasks);
    }

    /**
     * Create a new task.
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = Task::create($request->validated());
        $task->load('category');

        return response()->json(['data' => $task], 201);
    }

    /**
     * Show a single task.
     */
    public function show(Task $task): JsonResponse
    {
        $task->load('category');

        return response()->json(['data' => $task]);
    }

    /**
     * Update a task.
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $task->update($request->validated());
        $task->load('category');

        return response()->json(['data' => $task]);
    }

    /**
     * Delete a task.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }
}
