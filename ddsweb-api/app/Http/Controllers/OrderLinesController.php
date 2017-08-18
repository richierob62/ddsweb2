<?php

namespace App\Http\Controllers;

use App\Adtype;
use App\Order;
use App\OrderLine;
use App\Udac;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

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
        if (sizeof($sort_name) == 0) {
            $sort_name = 'order';
        }
        $sort_name = 'order_lines.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? OrderLine::buildFilter($filters) : [];

            $query = OrderLine::select(\DB::raw('order_lines.*'))
                ->join('orders', 'orders.id', '=', 'order_lines.order_id')
                ->join('udacs', 'udacs.id', '=', 'order_lines.udac_id')
                ->where($filter_array)
                ->orderBy(OrderLine::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function orderLineByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return response()->json(['data' => OrderLine::with([
                'udac.ad_type.fields',
                'udac.ad_type.page_type',
                'udac.primary_book',
                'fields',
            ])->findOrFail($id)], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newOrderLine(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            OrderLine::rules(),
            OrderLine::errorMessages()
        );

        $order_id = $request->input('order_id');
        $udac_id = $request->input('udac_id');

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $seq_num = $this->next_sequence($order_id);
            $order_line = OrderLine::create([
                'order_id' => $order_id,
                'udac_id' => $udac_id,
                'sequence' => $seq_num,
            ]);

            $this->renumberLines($order_id);

            $this->checkFieldOrderLineValues($order_line->id, $udac_id, 'ADD');
            return response()->json([
                'created' => true,
                'data' => $order_line->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
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

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $order_line = OrderLine::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $order_line->fill($request->all());
        $order_line->save();

        $this->checkFieldOrderLineValues($order_line->id, $order_line->udac_id, 'EDIT');
        return response()->json([
            'updated' => true,
            'data' => $order_line->toArray(),
        ], 200);
    }

    public function deleteOrderLine(Request $request)
    {
        $id = $request->input('id');
        try {
            $order_line = OrderLine::findOrFail($id);

            $this->checkFieldOrderLineValues($id, $order_line->udac_id, 'DEL');
            $order_line->delete();

            return response()->json([
                'deleted' => true,
                'id' => $id,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }
    }

    protected function buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir)
    {
        $cache_key = 'order_lines.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'order_line_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }

    public function next_sequence($order_id)
    {
        $order_lines = Order::findOrFail($order_id)->order_lines();
        if ($order_lines->count() > 0) {
            $last = $order_lines
                ->get()
                ->map(function ($line) {
                    return ((int) $line->sequence);
                })
                ->reduce(function ($acc, $item) {
                    return $item > $acc ? $item : $acc;
                }, 0);
            return $last + 1;
        }
        return 1;
    }

    public function renumberLines($order_id)
    {
        $order_lines_fn = Order::findOrFail($order_id)->order_lines()->orderBy('sequence');
        if ($order_lines_fn->count() > 0) {
            $order_lines_obj = $order_lines_fn->get();
            $seq = 1;
            foreach ($order_lines_obj as $line) {
                $line->sequence = $seq++;
                $line->save();
            }
        }
        return;
    }

    public function foundInList($id, $list)
    {
        return array_search($id, $list) != false;
    }

    public function removeFromList($id, $list)
    {
        $idx = array_search($id, $list);
        return array_slice($list, $idx, 1);
    }

    public function checkFieldOrderLineValues($order_line_id, $udac_id, $action)
    {

        $order_line = OrderLine::findOrFail($order_line_id);
        $udac = Udac::findOrFail($udac_id);
        $ad_type = AdType::findOrFail($udac->ad_type_id);

        $valid_fields = $ad_type->fields->map(function ($fld) {
            return $fld->id;
        })->toArray();

        if ($action == 'ADD') {
            $order_line->fields()->sync($valid_fields);
            return;
        }

        if ($action == 'DEL') {
            $order_line->fields()->detach();
            return;
        }

        // 2 passes
        // 1. detach those not in valid_list
        foreach ($order_line->fields as $fld) {
            if (!$this->foundInList($fld->id, $valid_fields)) {
                $order_line->fields()->detach($fld->id);
            } else {
                // remove from valid_fields so we don't overwrite later
                $valid_fields = $this->removeFromList($fld->id, $valid_fields);
            }
        }
        // 2. attach those still in valid list
        foreach ($valid_fields as $fld) {
            $order_line->fields()->attach($fld);
        }

        return;

    }

    public function editUdacData(Request $request)
    {
        $order_line_id = $request->input('order_line_id');
        $fields_data = $request->input('fields_data');
        $order_line = OrderLine::where('id', $order_line_id)->first();
        foreach ($fields_data as $key => $value) {
            $order_line->fields()
                ->updateExistingPivot($key, ['value' => $value]);
        }
        return response()->json($order_line->fresh([
            'udac.ad_type.fields',
            'udac.ad_type.page_type',
            'udac.primary_book',
            'fields',
        ]));
    }

    public function renumberOrderLines($order_id)
    {
        $order_lines_fn = OrderLine::where('order_id', $order_id)->orderBy('sequence');
        if ($order_lines_fn->count() > 0) {
            $order_lines_obj = $order_lines_fn->get();
            $seq = 1;
            foreach ($order_lines_obj as $order_line) {
                $order_line->sequence = $seq++;
                $order_line->save();
            }
        }
        return;
    }

    public function promoteOrderLine(Request $request)
    {
        $order_line_id = $request->input('order_line_id');
        $order_id = $request->input('order_id');

        $order_lines = OrderLine::where('order_id', $order_id)->orderBy('sequence')->get();
        foreach ($order_lines as $order_line) {
            if ($order_line->id == $order_line_id) {
                $current_seq = $order_line->sequence;
                if ($order_line->sequence == 1) {
                    break;
                }
                $order_line->sequence = $current_seq - 1;
                $order_line->save();
                $prev_line->sequence = $current_seq;
                $prev_line->save();
                $this->renumberOrderLines($order_id);
                break;
            } else {
                $prev_line = $order_line;
            }
        }

        return response()->json(
            [
                'promoted' => true,
                'data' => [
                    'order_id' => $order_id,
                    'order_line_id' => $order_line_id,
                    'sequence' => (int) $current_seq - 1,
                ],
            ], 201);
    }

    public function demoteOrderLine(Request $request)
    {
        $order_line_id = $request->input('order_line_id');
        $order_id = $request->input('order_id');

        $order_lines = OrderLine::where('order_id', $order_id)->orderBy('sequence', 'desc')->get();

        foreach ($order_lines as $order_line) {
            if ($order_line->id == $order_line_id) {
                $current_seq = $order_line->sequence;
                if ($order_line->sequence == $order_lines->count()) {
                    break;
                }
                $order_line->sequence = $current_seq + 1;
                $order_line->save();
                $prev_line->sequence = $current_seq;
                $prev_line->save();
                $this->renumberOrderLines($order_id);
                break;
            } else {
                $prev_line = $order_line;
            }
        }

        return response()->json(
            [
                'demoted' => true,
                'data' => [
                    'order_id' => $order_id,
                    'order_line_id' => $order_line_id,
                    'sequence' => (int) $current_seq + 1,
                ],
            ], 201);
    }

}
