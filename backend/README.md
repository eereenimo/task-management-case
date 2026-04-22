# Task Management API — Backend

This is the Laravel-based API for the Task Management module.

## Technical Stack
- **Framework:** Laravel 11 (API-only)
- **Database:** SQLite
- **Validation:** FormRequest classes
- **Architecture:** Clean, interview-friendly controller-model structure

## Local Setup Instructions

Follow these steps in order to run the backend locally:

1. **Prerequisites**
   - PHP >= 8.2
   - Composer installed

2. **Installation**
   ```bash
   cd backend
   composer install
   ```

3. **Environment Setup**
   - The `.env` file is already pre-configured for SQLite.
   - Run the following to generate the application key (if not already done):
     ```bash
     php artisan key:generate
     ```

4. **Database Initialization**
   - The SQLite database file `database/database.sqlite` is already created.
   - Run migrations and seeders:
     ```bash
     php artisan migrate:fresh --seed
     ```

5. **Start the server**
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

## Architecture Features

### Category Hierarchy
- **Structure:** Self-referencing `parent_id`.
- **Tree API:** `GET /api/categories` returns a nested JSON tree.
- **Task Filtering:** Selecting a category filters tasks for that category **and all its descendants**.

### Data Integrity
- **Deletion Rules:** A category cannot be deleted if it contains child categories or has tasks assigned to it.
- **Error Response:** Returns a `409 Conflict` with a descriptive message in these cases.

### Search & Filters
- Supports filtering by `status`, `priority`, and `category_id`.
- Search performs a partial match on both `title` and `description`.
- Default pagination is set to **10 items per page**.
