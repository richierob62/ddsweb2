<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class OrdersController
 * @package App\Http\Controllers
 */
class OrdersController extends Controller
{

    public function orders(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'order_num';
        }
        $sort_name = 'orders.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? Order::buildFilter($filters) : [];

            $query = Order::select(\DB::raw('orders.*'))
                ->join('sales_reps', 'sales_reps.id', '=', 'orders.sales_rep_id')
                ->join('customers', 'customers.id', '=', 'orders.customer_id')
                ->join('primary_books', 'primary_books.id', '=', 'orders.primary_book_id')
                ->join('order_statuses', 'order_statuses.id', '=', 'orders.order_status_id')
                ->where($filter_array)
                ->orderBy(Order::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = Order::orderBy('order_num')->get(['id', 'order_num'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->order_num];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function orderByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Order::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newOrder(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            Order::rules(),
            Order::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $order = Order::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $order->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
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

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $order = Order::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $order->fill($request->all());
        $order->save();
        return response()->json([
            'updated' => true,
            'data' => $order->toArray(),
        ], 200);
    }

    public function deleteOrder(Request $request)
    {
        $id = $request->input('id');
        try {
            $order = Order::findOrFail($id);

            if (!$order->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted']]);
            }

            $order->deleteOrderAndLines();
            return response()->json([
                'deleted' => true,
                'id' => $id,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }
    }

    public function nextOrderNumber()
    {
        $last_order_num = Order::orderBy('order_num', 'desc')->first()->order_num;
        return (string) ((int) $last_order_num + 1);
    }

    protected function buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir)
    {
        $cache_key = 'orders.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'order_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }
}
