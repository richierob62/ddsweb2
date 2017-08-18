<?php

namespace App\Http\Controllers;

use App\FindingLine;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class FindingLinesController
 * @package App\Http\Controllers
 */
class FindingLinesController extends Controller
{

    public function findingLines(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'finding_lines.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? FindingLine::buildFilter($filters) : [];

            $query = FindingLine::select(\DB::raw('finding_lines.*'))
                ->where($filter_array)
                ->orderBy(FindingLine::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = FindingLine::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function findingLineByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => FindingLine::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newFindingLine(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            FindingLine::rules(),
            FindingLine::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $finding_line = FindingLine::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $finding_line->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editFindingLine(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            FindingLine::rules($id),
            FindingLine::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $finding_line = FindingLine::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $finding_line->fill($request->all());
        $finding_line->save();
        return response()->json([
            'updated' => true,
            'data' => $finding_line->toArray(),
        ], 200);
    }

    public function deleteFindingLine(Request $request)
    {
        $id = $request->input('id');
        try {
            $finding_line = FindingLine::findOrFail($id);

            if (!$finding_line->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $finding_line->delete();
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
        $cache_key = 'finding_lines.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'finding_line_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
