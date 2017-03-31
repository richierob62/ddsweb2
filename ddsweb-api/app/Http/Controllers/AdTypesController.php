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
        
        $query = AdType::sortResultsBy($sort_name, $sort_dir);

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
}