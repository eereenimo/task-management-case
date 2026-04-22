<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        $tasks = [
            // Frontend tasks
            [
                'title'       => 'Implement responsive navbar',
                'description' => 'Build a responsive navigation bar using Tailwind CSS with mobile hamburger menu.',
                'status'      => 'done',
                'priority'    => 'high',
                'due_date'    => '2024-02-15',
                'category'    => 'Frontend',
            ],
            [
                'title'       => 'Add dark mode toggle',
                'description' => 'Implement dark mode support with system preference detection and manual toggle.',
                'status'      => 'in_progress',
                'priority'    => 'medium',
                'due_date'    => '2024-03-01',
                'category'    => 'Frontend',
            ],
            [
                'title'       => 'Fix pagination component',
                'description' => 'The pagination component does not correctly handle edge cases with single page results.',
                'status'      => 'todo',
                'priority'    => 'low',
                'due_date'    => '2024-03-10',
                'category'    => 'Frontend',
            ],

            // Backend tasks
            [
                'title'       => 'Set up API rate limiting',
                'description' => 'Configure rate limiting middleware for all API endpoints to prevent abuse.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-02-20',
                'category'    => 'Backend',
            ],
            [
                'title'       => 'Optimize database queries',
                'description' => 'Review and optimize N+1 queries in the task listing endpoint using eager loading.',
                'status'      => 'in_progress',
                'priority'    => 'high',
                'due_date'    => '2024-02-28',
                'category'    => 'Backend',
            ],
            [
                'title'       => 'Add request validation',
                'description' => 'Create FormRequest classes for all API endpoints with proper validation rules.',
                'status'      => 'done',
                'priority'    => 'medium',
                'due_date'    => '2024-02-10',
                'category'    => 'Backend',
            ],

            // DevOps tasks
            [
                'title'       => 'Set up CI/CD pipeline',
                'description' => 'Configure GitHub Actions for automated testing and deployment.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-03-15',
                'category'    => 'DevOps',
            ],
            [
                'title'       => 'Configure Docker containers',
                'description' => 'Create Docker Compose setup for local development environment.',
                'status'      => 'done',
                'priority'    => 'medium',
                'due_date'    => '2024-02-05',
                'category'    => 'DevOps',
            ],

            // UI Design tasks
            [
                'title'       => 'Design dashboard mockup',
                'description' => 'Create high-fidelity mockup for the admin dashboard in Figma.',
                'status'      => 'in_progress',
                'priority'    => 'high',
                'due_date'    => '2024-03-05',
                'category'    => 'UI Design',
            ],
            [
                'title'       => 'Create component library',
                'description' => 'Design reusable UI components: buttons, inputs, cards, modals.',
                'status'      => 'done',
                'priority'    => 'medium',
                'due_date'    => '2024-02-12',
                'category'    => 'UI Design',
            ],

            // UX Research tasks
            [
                'title'       => 'Conduct user interviews',
                'description' => 'Schedule and conduct 5 user interviews for the new task management feature.',
                'status'      => 'todo',
                'priority'    => 'medium',
                'due_date'    => '2024-03-20',
                'category'    => 'UX Research',
            ],

            // Management tasks
            [
                'title'       => 'Sprint planning for Q2',
                'description' => 'Prepare sprint backlog and velocity estimates for Q2 2024.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-03-25',
                'category'    => 'Management',
            ],
            [
                'title'       => 'Write project documentation',
                'description' => 'Document the API endpoints, data models, and architecture decisions.',
                'status'      => 'in_progress',
                'priority'    => 'medium',
                'due_date'    => '2024-03-08',
                'category'    => 'Management',
            ],

            // Health tasks
            [
                'title'       => 'Schedule annual checkup',
                'description' => 'Book appointment with Dr. Smith for annual health checkup.',
                'status'      => 'todo',
                'priority'    => 'medium',
                'due_date'    => '2024-04-01',
                'category'    => 'Health',
            ],

            // Exercise tasks
            [
                'title'       => 'Create workout plan',
                'description' => 'Design a 4-week progressive workout plan focusing on strength training.',
                'status'      => 'done',
                'priority'    => 'low',
                'due_date'    => '2024-02-01',
                'category'    => 'Exercise',
            ],
            [
                'title'       => 'Sign up for marathon',
                'description' => 'Register for the spring marathon and start training schedule.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-04-15',
                'category'    => 'Exercise',
            ],

            // Nutrition tasks
            [
                'title'       => 'Meal prep for the week',
                'description' => 'Plan and prepare healthy meals for the upcoming week.',
                'status'      => 'in_progress',
                'priority'    => 'low',
                'due_date'    => '2024-03-03',
                'category'    => 'Nutrition',
            ],

            // Learning tasks
            [
                'title'       => 'Complete TypeScript course',
                'description' => 'Finish the advanced TypeScript course on Udemy, including all practice exercises.',
                'status'      => 'in_progress',
                'priority'    => 'medium',
                'due_date'    => '2024-03-30',
                'category'    => 'Learning',
            ],
            [
                'title'       => 'Read "Clean Code"',
                'description' => 'Read Robert C. Martin\'s "Clean Code" and take notes on key principles.',
                'status'      => 'todo',
                'priority'    => 'low',
                'due_date'    => '2024-04-10',
                'category'    => 'Learning',
            ],

            // Finance tasks
            [
                'title'       => 'Review monthly budget',
                'description' => 'Analyze spending habits and adjust budget categories for next month.',
                'status'      => 'todo',
                'priority'    => 'medium',
                'due_date'    => '2024-03-28',
                'category'    => 'Finance',
            ],
            [
                'title'       => 'File tax return',
                'description' => 'Gather all documents and file annual tax return before deadline.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-04-15',
                'category'    => 'Finance',
            ],

            // Design (parent level) task
            [
                'title'       => 'Establish brand guidelines',
                'description' => 'Define color palette, typography, and logo usage rules for the brand.',
                'status'      => 'in_progress',
                'priority'    => 'high',
                'due_date'    => '2024-03-12',
                'category'    => 'Design',
            ],

            // Work (root level) task
            [
                'title'       => 'Prepare quarterly report',
                'description' => 'Compile team metrics and deliverables for the Q1 quarterly report.',
                'status'      => 'todo',
                'priority'    => 'high',
                'due_date'    => '2024-03-31',
                'category'    => 'Work',
            ],

            // Personal (root level) task
            [
                'title'       => 'Plan vacation',
                'description' => 'Research destinations and book flights for summer vacation.',
                'status'      => 'todo',
                'priority'    => 'low',
                'due_date'    => '2024-05-01',
                'category'    => 'Personal',
            ],

            // Additional tasks for better pagination testing
            [
                'title'       => 'Refactor authentication flow',
                'description' => 'Simplify the login/register flow and improve error handling.',
                'status'      => 'todo',
                'priority'    => 'medium',
                'due_date'    => '2024-03-18',
                'category'    => 'Backend',
            ],
            [
                'title'       => 'Write unit tests for API',
                'description' => 'Add PHPUnit tests for task and category controllers with edge cases.',
                'status'      => 'todo',
                'priority'    => 'medium',
                'due_date'    => '2024-03-22',
                'category'    => 'Backend',
            ],
        ];

        foreach ($tasks as $taskData) {
            $categoryName = $taskData['category'];
            unset($taskData['category']);

            $taskData['category_id'] = $categories[$categoryName]->id;

            Task::create($taskData);
        }
    }
}
