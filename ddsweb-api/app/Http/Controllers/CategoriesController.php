<?php

namespace App\Http\Controllers;

use App\Category;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class CategoriesController
* @package App\Http\Controllers
*/
class CategoriesController extends Controller
{
    
    public function categories(Request $request)
    {
        $query = Category::where('id','>',-1);
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
                $query = Category::filterOn($key, $filter, $query);
            }
        }
        
        $query = Category::sortResultsBy($sort_name, $sort_dir, $query);
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Category::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function categoryByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Category::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newCategory(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Category::rules(),
        Category::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $category = Category::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $category->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editCategory(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Category::rules($id),
        Category::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $category = Category::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $category->fill($request->all());
        $category->save();
        return response()->json([
        'updated' => true,
        'data' => $category->toArray()
        ], 201);
    }
    
    public function deleteCategory(Request $request)
    {
        $id = $request->input('id');
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}