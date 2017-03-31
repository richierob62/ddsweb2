<?php

namespace App\Http\Controllers;

use App\LocalForeign;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class LocalForeignsController
* @package App\Http\Controllers
*/
class LocalForeignsController extends Controller
{
    
    public function localForeigns(Request $request)
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
        
        $query = LocalForeign::sortResultsBy($sort_name, $sort_dir);
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = LocalForeign::filterOn($key, $filter);
            }
        }
        
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  LocalForeign::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function localForeignByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => LocalForeign::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newLocalForeign(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        LocalForeign::rules(),
        LocalForeign::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $local_foreign = LocalForeign::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $local_foreign->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editLocalForeign(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        LocalForeign::rules($id),
        LocalForeign::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $local_foreign = LocalForeign::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $local_foreign->fill($request->all());
        $local_foreign->save();
        return response()->json([
        'updated' => true,
        'data' => $local_foreign->toArray()
        ], 201);
    }
    
    public function deleteLocalForeign(Request $request)
    {
        $id = $request->input('id');
        try {
            $local_foreign = LocalForeign::findOrFail($id);
            $local_foreign->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}