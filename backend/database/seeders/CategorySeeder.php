<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Level 0 — Root categories
        $work = Category::create(['name' => 'Work', 'parent_id' => null]);
        $personal = Category::create(['name' => 'Personal', 'parent_id' => null]);

        // Level 1 — Under "Work"
        $development = Category::create(['name' => 'Development', 'parent_id' => $work->id]);
        $design = Category::create(['name' => 'Design', 'parent_id' => $work->id]);
        $management = Category::create(['name' => 'Management', 'parent_id' => $work->id]);

        // Level 2 — Under "Development"
        Category::create(['name' => 'Frontend', 'parent_id' => $development->id]);
        Category::create(['name' => 'Backend', 'parent_id' => $development->id]);
        Category::create(['name' => 'DevOps', 'parent_id' => $development->id]);

        // Level 2 — Under "Design"
        Category::create(['name' => 'UI Design', 'parent_id' => $design->id]);
        Category::create(['name' => 'UX Research', 'parent_id' => $design->id]);

        // Level 1 — Under "Personal"
        $health = Category::create(['name' => 'Health', 'parent_id' => $personal->id]);
        Category::create(['name' => 'Learning', 'parent_id' => $personal->id]);
        Category::create(['name' => 'Finance', 'parent_id' => $personal->id]);

        // Level 2 — Under "Health"
        Category::create(['name' => 'Exercise', 'parent_id' => $health->id]);
        Category::create(['name' => 'Nutrition', 'parent_id' => $health->id]);
    }
}
