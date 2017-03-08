<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
// use App\Transformer\CustomerTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
* Class CustomersController
* @package App\Http\Controllers
*/
class CustomersController extends Controller
{
    
    public function allCustomers()
    {
        return Customer::all();
        // return $this->collection(Customer::all(), new CustomerTransformer());
    }
    
    
    public function customerByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return Customer::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        // return $this->item(Customer::findOrFail($id), new CustomerTransformer());
    }
    
    //     /**
    //     * POST /customers
    //     *
    //     * @param Request $request
    //     * @return \Illuminate\Http\JsonResponse
    //     */
    //     public function store(Request $request)
    //     {
    //         $this->validate($request, [
    //         'title' => 'required|max:255',
    //         'description' => 'required',
    //         'author_id' => 'required|exists:authors,id'
    //         ], [
    //         'description.required' => 'Please provide a :attribute.'
    //         ]);
    //         $customer = Customer::create($request->all());
    //         $data = $this->item($customer, new CustomerTransformer());
    //         return response()->json($data, 201, [
    //         'Location' => route('customers.show', ['id' => $customer->id])
    //         ]);
    //     }
    //     /**
    //     * PUT /customers/{id}
    //     *
    //     * @param Request $request
    //     * @param $id
    //     * @return mixed
    //     */
    //     public function update(Request $request, $id)
    //     {
    //         try {
    //             $customer = Customer::findOrFail($id);
    //         } catch (ModelNotFoundException $e) {
    //             return response()->json([
    //             'error' => [
    //             'message' => 'Customer not found'
    //             ]
    //             ], 404);
    //         }
    //         $this->validate($request, [
    //         'title' => 'required|max:255',
    //         'description' => 'required',
    //         'author_id' => 'exists:authors,id'
    //         ], [
    //         'description.required' => 'Please provide a :attribute.'
    //         ]);
    //         $customer->fill($request->all());
    //         $customer->save();
    //         return $this->item($customer, new CustomerTransformer());
    //     }
    //     /**
    //     * DELETE /customers/{id}
    //     * @param $id
    //     * @return \Illuminate\Http\JsonResponse
    //     */
    //     public function destroy($id)
    //     {
    //         try {
    //             $customer = Customer::findOrFail($id);
    //         } catch (ModelNotFoundException $e) {
    //             return response()->json([
    //             'error' => [
    //             'message' => 'Customer not found'
    //             ]
    //             ], 404);
    //         }
    //         $customer->delete();
    //         return response(null, 204);
    //     }
}