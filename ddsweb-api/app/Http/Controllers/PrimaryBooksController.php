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
        $filters = $request->input('filters');
        
        $sort_name = $request->input('sort_name');
        if(sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        
        $sort_dir = $request->input('sort_dir');
        if(sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }
        
        $query = PrimaryBook::select(\DB::raw('primary_books.*'))
        ->orderBy(PrimaryBook::orderField($sort_name), $sort_dir); 
                
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = PrimaryBook::filterOn($key, $filter);
            }
        }
        
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

            if(!$primary_book->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            }

            $primary_book->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

    public function attachSourceBook(Request $request)
    {
        $pb_id = $request->input('id');
        $source_book_id = $request->input('source_book');
        try {
            $primary_book = PrimaryBook::findOrFail($pb_id);
            $primary_book->source_books()->attach($source_book_id);
            return response()->json([
            'created' => true,
            'data' => [
            'id' => $pb_id,
            'source_book' => $source_book_id
            ]
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function removeSourceBook(Request $request)
    {
        $pb_id = $request->input('id');
        $source_book_id = $request->input('source_book');
        try {
            $primary_book = PrimaryBook::findOrFail($pb_id);
            $primary_book->source_books()->detach($source_book_id);
            return response()->json([
            'deleted' => true,
            'data' => [
            'id' => $pb_id,
            'source_book' => $source_book_id
            ]
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

}