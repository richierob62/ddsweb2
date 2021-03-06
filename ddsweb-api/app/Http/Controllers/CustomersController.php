<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class CustomersController
 * @package App\Http\Controllers
 */
class CustomersController extends Controller
{

    public function customers(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'customers.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? Customer::buildFilter($filters) : [];

            $query = Customer::select(\DB::raw('customers.*'))
                ->join('sales_reps', 'sales_reps.id', '=', 'customers.sales_rep_id')
                ->where($filter_array)
                ->orderBy(Customer::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = Customer::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function customerByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Customer::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newCustomer(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            Customer::rules(),
            Customer::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $customer = Customer::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $customer->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
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

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $customer = Customer::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $customer->fill($request->all());
        $customer->save();
        return response()->json([
            'updated' => true,
            'data' => $customer->toArray(),
        ], 200);
    }

    public function deleteCustomer(Request $request)
    {
        $id = $request->input('id');
        try {
            $customer = Customer::findOrFail($id);

            if (!$customer->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $customer->delete();
            return response()->json([
                'deleted' => true,
                'id' => $id,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }
    }

    public function nextCustomerNumber()
    {
        $last_acc_num = Customer::orderBy('account_num', 'desc')->first()->account_num;
        return (string) ((int) $last_acc_num + 1);
    }

    protected function buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir)
    {
        $cache_key = 'customers.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'customer_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
