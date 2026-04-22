<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('category')->id;

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                // Unique name among siblings (same parent_id), excluding self
                Rule::unique('categories')->where(function ($query) {
                    $parentId = $this->input('parent_id', $this->route('category')->parent_id);
                    return $query->where('parent_id', $parentId);
                })->ignore($categoryId),
            ],
            'parent_id' => [
                'nullable',
                'integer',
                'exists:categories,id',
                // Cannot set self as parent
                function (string $attribute, mixed $value, \Closure $fail) use ($categoryId) {
                    if ($value == $categoryId) {
                        $fail('A category cannot be its own parent.');
                    }

                    // Cannot set a descendant as parent (would create a cycle)
                    if ($value) {
                        $category = Category::find($categoryId);
                        $descendantIds = $category->getDescendantIds();
                        if (in_array($value, $descendantIds)) {
                            $fail('Cannot set a descendant category as parent (circular reference).');
                        }
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'A category with this name already exists at this level.',
        ];
    }
}
