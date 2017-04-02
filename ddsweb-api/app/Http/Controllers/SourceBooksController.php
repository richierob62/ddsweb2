<?php

namespace App\Http\Controllers;

use App\SourceBook;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class SourceBooksController
* @package App\Http\Controllers
*/
class SourceBooksController extends Controller
{
    
    public function sourceBooks(Request $request)
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

        $query = SourceBook::select(\DB::raw('source_books.*'))
        ->orderBy(SourceBook::orderField($sort_name), $sort_dir); 
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = SourceBook::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  SourceBook::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function sourceBookByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => SourceBook::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newSourceBook(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        SourceBook::rules(),
        SourceBook::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $source_book = SourceBook::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $source_book->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editSourceBook(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        SourceBook::rules($id),
        SourceBook::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $source_book = SourceBook::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $source_book->fill($request->all());
        $source_book->save();
        return response()->json([
        'updated' => true,
        'data' => $source_book->toArray()
        ], 201);
    }
    
    public function deleteSourceBook(Request $request)
    {
        $id = $request->input('id');
        try {
            $source_book = SourceBook::findOrFail($id);
            $source_book->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}