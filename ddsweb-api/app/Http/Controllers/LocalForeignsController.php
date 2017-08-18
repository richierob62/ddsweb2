<?php

namespace App\Http\Controllers;

use App\LocalForeign;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class LocalForeignsController
 * @package App\Http\Controllers
 */
class LocalForeignsController extends Controller
{

    public function localForeigns(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'local_foreigns.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? LocalForeign::buildFilter($filters) : [];

            $query = LocalForeign::select(\DB::raw('local_foreigns.*'))
                ->where($filter_array)
                ->orderBy(LocalForeign::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = LocalForeign::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function localForeignByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => LocalForeign::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newLocalForeign(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            LocalForeign::rules(),
            LocalForeign::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $local_foreign = LocalForeign::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $local_foreign->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editLocalForeign(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            LocalForeign::rules($id),
            LocalForeign::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $local_foreign = LocalForeign::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $local_foreign->fill($request->all());
        $local_foreign->save();
        return response()->json([
            'updated' => true,
            'data' => $local_foreign->toArray(),
        ], 200);
    }

    public function deleteLocalForeign(Request $request)
    {
        $id = $request->input('id');
        try {
            $local_foreign = LocalForeign::findOrFail($id);

            if (!$local_foreign->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $local_foreign->delete();
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
        $cache_key = 'local_foreigns.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'local_foreign_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
