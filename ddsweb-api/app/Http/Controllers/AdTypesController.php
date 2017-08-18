<?php

namespace App\Http\Controllers;

use App\AdType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/**k
 * Class AdTypesController
 * @package App\Http\Controllers
 */
class AdTypesController extends Controller
{

    public function adTypes(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'ad_types.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? AdType::buildFilter($filters) : [];

            $query = AdType::select(\DB::raw('ad_types.*'))
                ->join('page_types', 'page_types.id', '=', 'ad_types.page_type_id')
                ->where($filter_array)
                ->orderBy(AdType::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = AdType::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function adTypeByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => AdType::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newAdType(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            AdType::rules(),
            AdType::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $ad_type = AdType::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $ad_type->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
        };
    }

    public function editAdType(Request $request)
    {
        $id = $request->input('id');

        $validator = Validator::make(
            $request->all(),
            AdType::rules($id),
            AdType::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $ad_type = AdType::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $ad_type->fill($request->all());
        $ad_type->save();
        return response()->json([
            'updated' => true,
            'data' => $ad_type->toArray(),
        ], 200);
    }

    public function deleteAdType(Request $request)
    {
        $id = $request->input('id');
        try {
            $ad_type = AdType::findOrFail($id);

            if (!$ad_type->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $ad_type->delete();
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
        $cache_key = 'ad_types.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'ad_type_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }

    public function getFields(Request $request)
    {
        $id = $request->input('id');
        try {
            $fields = AdType::findOrFail($id)->fields()->orderBy('ad_type_field.sequence')->get();
            return response()->json(['data' => $fields]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function addField(Request $request)
    {
        $ad_id = $request->input('id');
        $field_id = $request->input('field');
        try {
            $ad_type = AdType::findOrFail($ad_id);
            $seq = $this->next_sequence($ad_id);
            $ad_type->fields()->attach($field_id, ['sequence' => $seq]);
            return response()->json([
                'created' => true,
                'data' => [
                    'id' => $ad_id,
                    'field' => $field_id,
                    'sequence' => $seq,
                ],
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function deleteField(Request $request)
    {
        $ad_id = $request->input('id');
        $field_id = $request->input('field');
        try {
            $ad_type = AdType::findOrFail($ad_id);
            $ad_type->fields()->detach($field_id);
            $this->renumberFields($ad_id);
            return response()->json([
                'deleted' => true,
                'data' => [
                    'id' => $ad_id,
                    'field' => $field_id,
                ],
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function next_sequence($ad_id)
    {
        $fields = AdType::findOrFail($ad_id)->fields();
        if ($fields->count() > 0) {
            $last = $fields
                ->get()
                ->map(function ($fld) {
                    return ((int) $fld->pivot->sequence);
                })
                ->reduce(function ($acc, $item) {
                    return $item > $acc ? $item : $acc;
                }, 0);
            return $last + 1;
        }
        return 1;
    }

    public function renumberFields($ad_id)
    {
        $fields_fn = AdType::findOrFail($ad_id)->fields()->orderBy('ad_type_field.sequence');
        if ($fields_fn->count() > 0) {
            $fields_obj = $fields_fn->get();
            $seq = 1;
            foreach ($fields_obj as $fld) {
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($fld->id, ['sequence' => $seq++]);
            }
        }
        return;
    }

    public function promoteField(Request $request)
    {
        $ad_id = $request->input('id');
        $field_id = $request->input('field');
        $flds = AdType::findOrFail($ad_id)->fields()->get();
        foreach ($flds as $fld) {
            if ($fld->id == $field_id) {
                $current_seq = $fld->pivot->sequence;
                if ($fld->pivot->sequence == 1) {
                    break;
                }
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($fld->id, ['sequence' => $current_seq - 1]);
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($prev_fld->id, ['sequence' => $current_seq]);
                $this->renumberFields($ad_id);
                break;
            } else {
                $prev_fld = $fld;
            }
        }

        return response()->json([
            'promoted' => true,
            'data' => [
                'id' => $ad_id,
                'field' => $field_id,
                'sequence' => (int) $current_seq - 1,
            ],
        ], 200);
    }

    public function demoteField(Request $request)
    {
        $ad_id = $request->input('id');
        $field_id = $request->input('field');
        $flds = AdType::findOrFail($ad_id)->fields()->get();
        $last_seq_num = AdType::findOrFail($ad_id)->fields()->count();
        foreach ($flds as $fld) {
            if ($fld->id == $field_id) {
                $current_seq = $fld->pivot->sequence;
                if ($fld->pivot->sequence == $last_seq_num) {
                    break;
                }
                $next_fld_id = AdType::findOrFail($ad_id)
                    ->fields()
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'seq' => $item->pivot->sequence,
                        ];
                    })
                    ->filter(function ($val, $key) use ($current_seq) {
                        return $val['seq'] == $current_seq + 1;
                    })
                    ->first()['id'];
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($fld->id, ['sequence' => $current_seq + 1]);
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($next_fld_id, ['sequence' => $current_seq]);
                $this->renumberFields($ad_id);
                break;
            }
        }

        return response()->json([
            'demoted' => true,
            'data' => [
                'id' => $ad_id,
                'field' => $field_id,
                'sequence' => (int) $current_seq + 1,
            ],
        ], 200);
    }
}
