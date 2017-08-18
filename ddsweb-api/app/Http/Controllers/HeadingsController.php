<?php

namespace App\Http\Controllers;

use App\Heading;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class HeadingsController
 * @package App\Http\Controllers
 */
class HeadingsController extends Controller
{

    public function headings(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'headings.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? Heading::buildFilter($filters) : [];

            $query = Heading::select(\DB::raw('headings.*'))
                ->join('page_types', 'page_types.id', '=', 'headings.page_type_id')
                ->where($filter_array)
                ->orderBy(Heading::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = Heading::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function headingByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Heading::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newHeading(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            Heading::rules(),
            Heading::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $heading = Heading::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $heading->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editHeading(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            Heading::rules($id),
            Heading::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $heading = Heading::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $heading->fill($request->all());
        $heading->save();
        return response()->json([
            'updated' => true,
            'data' => $heading->toArray(),
        ], 200);
    }

    public function deleteHeading(Request $request)
    {
        $id = $request->input('id');
        try {
            $heading = Heading::findOrFail($id);

            if (!$heading->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $heading->delete();
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
        $cache_key = 'headings.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'heading_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
