<?php

namespace App\Http\Controllers;

use App\Field;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class FieldsController
* @package App\Http\Controllers
*/
class FieldsController extends Controller
{
    
    public function fields(Request $request)
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
        
        $query = Field::select(\DB::raw('fields.*'))
        ->orderBy(Field::orderField($sort_name), $sort_dir);
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = Field::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Field::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function fieldByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Field::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newField(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Field::rules(),
        Field::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $field = Field::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $field->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editField(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Field::rules($id),
        Field::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $field = Field::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $field->fill($request->all());
        $field->save();
        return response()->json([
        'updated' => true,
        'data' => $field->toArray()
        ], 201);
    }
    
    public function deleteField(Request $request)
    {
        $id = $request->input('id');
        try {
            $field = Field::findOrFail($id);
            $field->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

}