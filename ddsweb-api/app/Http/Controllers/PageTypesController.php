<?php

namespace App\Http\Controllers;

use App\PageType;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class PageTypesController
* @package App\Http\Controllers
*/
class PageTypesController extends Controller
{
    
    public function pageTypes(Request $request)
    {
        $query = PageType::where('id','>',-1);
        $filters = $request->input('filters');
        
        $sort_name = $request->input('sort_name');
        if(sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        
        $sort_dir = $request->input('sort_dir');
        if(sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = PageType::filterOn($key, $filter, $query);
            }
        }
        
        $query = PageType::sortResultsBy($sort_name, $sort_dir, $query);

        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  PageType::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function pageTypeByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => PageType::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newPageType(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        PageType::rules(),
        PageType::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $page_type = PageType::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $page_type->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editPageType(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        PageType::rules($id),
        PageType::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $page_type = PageType::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $page_type->fill($request->all());
        $page_type->save();
        return response()->json([
        'updated' => true,
        'data' => $page_type->toArray()
        ], 201);
    }
    
    public function deletePageType(Request $request)
    {
        $id = $request->input('id');
        try {
            $page_type = PageType::findOrFail($id);
            $page_type->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}