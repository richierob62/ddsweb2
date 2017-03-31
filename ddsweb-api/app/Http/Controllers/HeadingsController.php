<?php

namespace App\Http\Controllers;

use App\Heading;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class HeadingsController
* @package App\Http\Controllers
*/
class HeadingsController extends Controller
{
    
    public function headings(Request $request)
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
        
        $query = Heading::sortResultsBy($sort_name, $sort_dir);
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = Heading::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Heading::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function headingByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Heading::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newHeading(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Heading::rules(),
        Heading::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $heading = Heading::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $heading->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editHeading(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Heading::rules($id),
        Heading::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $heading = Heading::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $heading->fill($request->all());
        $heading->save();
        return response()->json([
        'updated' => true,
        'data' => $heading->toArray()
        ], 201);
    }
    
    public function deleteHeading(Request $request)
    {
        $id = $request->input('id');
        try {
            $heading = Heading::findOrFail($id);
            $heading->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}