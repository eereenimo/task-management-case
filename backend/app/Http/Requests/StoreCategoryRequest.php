<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // No auth required
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                // Unique name among siblings (same parent_id)
                Rule::unique('categories')->where(function ($query) {
                    return $query->where('parent_id', $this->input('parent_id'));
                }),
            ],
            'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'A category with this name already exists at this level.',
        ];
    }
}
