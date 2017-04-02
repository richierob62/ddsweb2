<?php

namespace App\Http\Controllers;

use App\OrderLine;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class OrderLinesController
* @package App\Http\Controllers
*/
class OrderLinesController extends Controller
{
    
    public function orderLines(Request $request)
    {
        
        $filters = $request->input('filters');
        
        $sort_name = $request->input('sort_name');
        if(sizeof($sort_name) == 0) {
            $sort_name = 'order';
        }
        
        $sort_dir = $request->input('sort_dir');
        if(sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }
        
        $query = OrderLine::select(\DB::raw('order_lines.*'))
        ->join('orders', 'orders.id', '=', 'order_lines.order_id')
        ->join('udacs', 'udacs.id', '=', 'order_lines.udac_id')
        ->orderBy(Orderline::orderField($sort_name), $sort_dir);
        
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = OrderLine::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  OrderLine::orderBy('order')->get(['id', 'order'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->order ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function orderLineByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => OrderLine::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newOrderLine(Request $request)
    {
        
        $validator = Validator::make(
        $request->all(),
        OrderLine::rules(),
        OrderLine::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $order_line = OrderLine::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $order_line->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editOrderLine(Request $request)
    {
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        OrderLine::rules($id),
        OrderLine::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $order_line = OrderLine::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $order_line->fill($request->all());
        $order_line->save();
        return response()->json([
        'updated' => true,
        'data' => $order_line->toArray()
        ], 201);
    }
    
    public function deleteOrderLine(Request $request)
    {
        $id = $request->input('id');
        try {
            $order_line = OrderLine::findOrFail($id);
            $order_line->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    // public function nextSequenceNumber(Request $request)
    // {
    //     $last_seq_num = OrderLine::where('order', $request->input('order'))
    //     ->orderBy('sequence', 'desc')->first()->sequence;
    //     return (int)$last_seq_num + 1;
    // }
    
}