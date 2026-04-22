<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Task Management API endpoints.
| All routes are prefixed with /api automatically.
|
*/

Route::apiResource('categories', CategoryController::class);
Route::apiResource('tasks', TaskController::class);
