<?php

namespace App\Http\Controllers;

use App\PageType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class PageTypesController
 * @package App\Http\Controllers
 */
class PageTypesController extends Controller
{

    public function pageTypes(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'page_types.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? PageType::buildFilter($filters) : [];

            $query = PageType::select(\DB::raw('page_types.*'))
                ->where($filter_array)
                ->orderBy(PageType::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = PageType::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function pageTypeByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => PageType::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newPageType(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            PageType::rules(),
            PageType::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $page_type = PageType::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $page_type->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editPageType(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            PageType::rules($id),
            PageType::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $page_type = PageType::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $page_type->fill($request->all());
        $page_type->save();
        return response()->json([
            'updated' => true,
            'data' => $page_type->toArray(),
        ], 200);
    }

    public function deletePageType(Request $request)
    {
        $id = $request->input('id');
        try {
            $page_type = PageType::findOrFail($id);

            if (!$page_type->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $page_type->delete();
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
        $cache_key = 'page_types.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'page_type_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
