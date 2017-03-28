<?php

namespace App\Http\Controllers;

use App\PrimaryBook;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class PrimaryBooksController
* @package App\Http\Controllers
*/
class PrimaryBooksController extends Controller
{
    
    public function primaryBooks(Request $request)
    {
        $query = PrimaryBook::where('id','>',-1);
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
                $query = PrimaryBook::filterOn($key, $filter, $query);
            }
        }
        
        $query = PrimaryBook::sortResultsBy($sort_name, $sort_dir, $query);

        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  PrimaryBook::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function primaryBookByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => PrimaryBook::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newPrimaryBook(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        PrimaryBook::rules(),
        PrimaryBook::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $primary_book = PrimaryBook::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $primary_book->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editPrimaryBook(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        PrimaryBook::rules($id),
        PrimaryBook::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $primary_book = PrimaryBook::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $primary_book->fill($request->all());
        $primary_book->save();
        return response()->json([
        'updated' => true,
        'data' => $primary_book->toArray()
        ], 201);
    }
    
    public function deletePrimaryBook(Request $request)
    {
        $id = $request->input('id');
        try {
            $primary_book = PrimaryBook::findOrFail($id);
            $primary_book->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}