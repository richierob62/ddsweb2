<?php

namespace App\Http\Controllers;

use App\CompensationPlan;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class CompensationPlansController
* @package App\Http\Controllers
*/
class CompensationPlansController extends Controller
{
    
    public function compensationPlans(Request $request)
    {
        $filters = $request->input('filters');
        
        $sort_name = $request->input('sort_name');
        if(sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        
        $sort_dir = $request->input('sort_dir');
        if(sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        $query = CompensationPlan::select(\DB::raw('compensation_plans.*'))
        ->orderBy(CompensationPlan::orderField($sort_name), $sort_dir);       
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = CompensationPlan::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  CompensationPlan::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function compensationPlanByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => CompensationPlan::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newCompensationPlan(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        CompensationPlan::rules(),
        CompensationPlan::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $compensation_plan = CompensationPlan::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $compensation_plan->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
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
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $compensation_plan = CompensationPlan::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $compensation_plan->fill($request->all());
        $compensation_plan->save();
        return response()->json([
        'updated' => true,
        'data' => $compensation_plan->toArray()
        ], 201);
    }
    
    public function deleteCompensationPlan(Request $request)
    {
        $id = $request->input('id');
        try {
            $compensation_plan = CompensationPlan::findOrFail($id);

            if(!$compensation_plan->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            }

            $compensation_plan->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}