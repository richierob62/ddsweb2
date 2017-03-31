<?php

namespace App\Http\Controllers;

use App\OrderStatus;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class OrderStatusesController
* @package App\Http\Controllers
*/
class OrderStatusesController extends Controller
{
    
    public function orderStatuses(Request $request)
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

        $query = OrderStatus::sortResultsBy($sort_name, $sort_dir);
                
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = OrderStatus::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  OrderStatus::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function orderStatusByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => OrderStatus::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newOrderStatus(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        OrderStatus::rules(),
        OrderStatus::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $pay_plan = OrderStatus::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $pay_plan->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editOrderStatus(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        OrderStatus::rules($id),
        OrderStatus::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $pay_plan = OrderStatus::findOrFail($id);
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
    
    public function deleteOrderStatus(Request $request)
    {
        $id = $request->input('id');
        try {
            $pay_plan = OrderStatus::findOrFail($id);
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