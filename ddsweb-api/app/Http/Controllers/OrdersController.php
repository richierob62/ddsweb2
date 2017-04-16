<?php

namespace App\Http\Controllers;

use App\Order;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class OrdersController
* @package App\Http\Controllers
*/
class OrdersController extends Controller
{
    
    public function orders(Request $request)
    {
        $filters = $request->input('filters');
        
        $sort_name = $request->input('sort_name');
        if(sizeof($sort_name) == 0) {
            $sort_name = 'order_num';
        }
        
        $sort_dir = $request->input('sort_dir');
        if(sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }


        $query = Order::select(\DB::raw('orders.*'))
        ->join('sales_reps', 'sales_reps.id', '=', 'orders.sales_rep_id')
        ->join('customers', 'customers.id', '=', 'orders.customer_id')
        ->join('primary_books', 'primary_books.id', '=', 'orders.primary_book_id')
        ->join('order_statuses', 'order_statuses.id', '=', 'orders.order_status_id')
        ->orderBy(Order::orderField($sort_name), $sort_dir);
        
                
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = Order::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Order::orderBy('order_num')->get(['id', 'order_num'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->order_num ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function orderByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Order::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newOrder(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Order::rules(),
        Order::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $order = Order::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $order->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editOrder(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Order::rules($id),
        Order::errorMessages()
        );

        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $order = Order::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $order->fill($request->all());
        $order->save();
        return response()->json([
        'updated' => true,
        'data' => $order->toArray()
        ], 201);
    }
    
    public function deleteOrder(Request $request)
    {
        $id = $request->input('id');
        try {
            $order = Order::findOrFail($id);
            $order->deleteOrderAndLines();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

    public function nextOrderNumber()
    {
        $last_order_num = Order::orderBy('order_num', 'desc')->first()->order_num;
        return (string) ((int) $last_order_num + 1);
    }
}