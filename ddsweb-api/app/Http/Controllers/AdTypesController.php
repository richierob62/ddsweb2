<?php

namespace App\Http\Controllers;

use App\AdType;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class AdTypesController
* @package App\Http\Controllers
*/
class AdTypesController extends Controller
{
    
    public function adTypes(Request $request)
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
        
        $query = AdType::select(\DB::raw('ad_types.*'))
        ->join('page_types', 'page_types.id', '=', 'ad_types.page_type_id')
        ->orderBy(AdType::orderField($sort_name), $sort_dir);
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = AdType::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  AdType::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function adTypeByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => AdType::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newAdType(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        AdType::rules(),
        AdType::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $ad_type = AdType::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $ad_type->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
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
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $ad_type = AdType::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $ad_type->fill($request->all());
        $ad_type->save();
        return response()->json([
        'updated' => true,
        'data' => $ad_type->toArray()
        ], 201);
    }
    
    public function deleteAdType(Request $request)
    {
        $id = $request->input('id');
        try {
            $ad_type = AdType::findOrFail($id);
            $ad_type->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function getFields(Request $request)
    {
        $id = $request->input('id');
        try {
            $fields = AdType::findOrFail($id)->fields()->orderBy('ad_type_fields.sequence')->get();
            return response()->json(['data' => $fields]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
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
            'sequence' => $seq
            ]
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
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
            'field' => $field_id
            ]
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function next_sequence($ad_id) {
        $fields = AdType::findOrFail($ad_id)->fields();
        if ($fields->count() > 0) {
            $last = $fields
            ->get()
            ->map( function($fld) {
                return ((int) $fld->pivot->sequence);
            } )
            ->reduce(function ($acc, $item) {
                return $item > $acc ? $item : $acc;
            }, 0);
            return $last + 1;
        }
        return 1;
    }
    
    public function renumberFields($ad_id) {
        $fields_fn = AdType::findOrFail($ad_id)->fields()->orderBy('ad_type_fields.sequence');
        if ($fields_fn->count() > 0) {
            $fields_obj = $fields_fn->get();
            $seq = 1;
            foreach( $fields_obj as $fld) {
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
        foreach( $flds as $fld) {
            if ($fld->id == $field_id){
                $current_seq = $fld->pivot->sequence;
                if ($fld->pivot->sequence == 1) {
                    break;
                }
                AdType::findOrFail($ad_id)->fields()->updateExistingPivot($fld->id, ['sequence' => $current_seq -1]);
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
        'sequence' => (int) $current_seq -1
        ]
        ], 201);
    }
    

    public function demoteField(Request $request)
    {
        $ad_id = $request->input('id');
        $field_id = $request->input('field');
        $flds = AdType::findOrFail($ad_id)->fields()->get();
        $last_seq_num = AdType::findOrFail($ad_id)->fields()->count();
        foreach( $flds as $fld) {
            if ($fld->id == $field_id){
                $current_seq = $fld->pivot->sequence;
                if ($fld->pivot->sequence == $last_seq_num) {
                    break;
                }
                $next_fld_id = AdType::findOrFail($ad_id)
                ->fields()
                ->get()
                ->map( function($item) {
                    return [
                        'id' => $item->id,
                        'seq' => $item->pivot->sequence
                    ];
                })
                ->filter( function ($val, $key) use ($current_seq) {
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
        'sequence' => (int) $current_seq + 1
        ]
        ], 201);
    }  
}