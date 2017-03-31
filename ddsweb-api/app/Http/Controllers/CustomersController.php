<?php

namespace App\Http\Controllers;

use App\Customer;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class CustomersController
* @package App\Http\Controllers
*/
class CustomersController extends Controller
{
    
    public function customers(Request $request)
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
        
        $query = Customer::sortResultsBy($sort_name, $sort_dir);

        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = Customer::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Customer::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function customerByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Customer::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newCustomer(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Customer::rules(),
        Customer::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $customer = Customer::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $customer->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editCustomer(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Customer::rules($id),
        Customer::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $customer = Customer::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $customer->fill($request->all());
        $customer->save();
        return response()->json([
        'updated' => true,
        'data' => $customer->toArray()
        ], 201);
    }
    
    public function deleteCustomer(Request $request)
    {
        $id = $request->input('id');
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

    public function nextCustomerNumber()
    {
        $last_acc_num = Customer::orderBy('account_num', 'desc')->first()->account_num;
        return (string) ((int) $last_acc_num + 1);
    }
    
}