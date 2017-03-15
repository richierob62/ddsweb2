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
    
    public function customers()
    {
        return ['data' => Customer::all()->toArray()];
        // return $this->collection(Customer::all(), new CustomerTransformer());
    }
    
    
    public function customerByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Customer::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        // return $this->item(Customer::findOrFail($id), new CustomerTransformer());
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
}