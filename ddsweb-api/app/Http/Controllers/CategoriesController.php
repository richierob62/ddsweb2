<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class CategoriesController
 * @package App\Http\Controllers
 */
class CategoriesController extends Controller
{

    public function categories(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'categories.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? Category::buildFilter($filters) : [];

            $query = Category::select(\DB::raw('categories.*'))
                ->where($filter_array)
                ->orderBy(Category::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = Category::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function categoryByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Category::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newCategory(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            Category::rules(),
            Category::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $category = Category::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $category->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editCategory(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            Category::rules($id),
            Category::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $category = Category::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $category->fill($request->all());
        $category->save();
        return response()->json([
            'updated' => true,
            'data' => $category->toArray(),
        ], 200);
    }

    public function deleteCategory(Request $request)
    {
        $id = $request->input('id');
        try {
            $category = Category::findOrFail($id);

            if (!$category->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $category->delete();
            return response()->json([
                'deleted' => true,
                'id' => $id,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }
    }

    protected function buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir)
    {
        $cache_key = 'categories.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'category_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
