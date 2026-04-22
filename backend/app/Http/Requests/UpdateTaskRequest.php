<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['sometimes', Rule::in(['todo', 'in_progress', 'done'])],
            'priority'    => ['sometimes', Rule::in(['low', 'medium', 'high'])],
            'due_date'    => ['nullable', 'date'],
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
        ];
    }
}
