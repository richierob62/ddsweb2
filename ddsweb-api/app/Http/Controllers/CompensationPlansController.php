<?php

namespace App\Http\Controllers;

use App\CompensationPlan;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class CompensationPlansController
 * @package App\Http\Controllers
 */
class CompensationPlansController extends Controller
{

    public function compensationPlans(Request $request)
    {

        $filters = $request->input('filters');

        
        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'compensation_plans.' . $sort_name;
        
        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }
        
        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);
        
        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? CompensationPlan::buildFilter($filters) : [];
            $query = CompensationPlan::select(\DB::raw('compensation_plans.*'))
            ->where($filter_array)
            ->orderBy(CompensationPlan::orderField($sort_name), $sort_dir);
            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = CompensationPlan::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function compensationPlanByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => CompensationPlan::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newCompensationPlan(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            CompensationPlan::rules(),
            CompensationPlan::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $compensation_plan = CompensationPlan::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $compensation_plan->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editCompensationPlan(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            CompensationPlan::rules($id),
            CompensationPlan::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $compensation_plan = CompensationPlan::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $compensation_plan->fill($request->all());
        $compensation_plan->save();
        return response()->json([
            'updated' => true,
            'data' => $compensation_plan->toArray(),
        ], 200);
    }

    public function deleteCompensationPlan(Request $request)
    {
        $id = $request->input('id');
        try {
            $compensation_plan = CompensationPlan::findOrFail($id);

            if (!$compensation_plan->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $compensation_plan->delete();
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
        $cache_key = 'compensation_plans.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'compensation_plan_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
