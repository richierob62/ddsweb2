<?php

namespace App\Http\Controllers;

use App\PayPlan;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class PayPlansController
* @package App\Http\Controllers
*/
class PayPlansController extends Controller
{
    
    public function payPlans(Request $request)
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

        $query = PayPlan::select(\DB::raw('pay_plans.*'))
        ->orderBy(PayPlan::orderField($sort_name), $sort_dir);       
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = PayPlan::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  PayPlan::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function payPlanByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => PayPlan::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newPayPlan(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        PayPlan::rules(),
        PayPlan::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $pay_plan = PayPlan::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $pay_plan->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editPayPlan(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        PayPlan::rules($id),
        PayPlan::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $pay_plan = PayPlan::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $pay_plan->fill($request->all());
        $pay_plan->save();
        return response()->json([
        'updated' => true,
        'data' => $pay_plan->toArray()
        ], 201);
    }
    
    public function deletePayPlan(Request $request)
    {
        $id = $request->input('id');
        try {
            $pay_plan = PayPlan::findOrFail($id);

            if(!$pay_plan->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            }

            $pay_plan->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}