<?php

namespace App\Http\Controllers;

use App\Udac;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class UdacsController
* @package App\Http\Controllers
*/
class UdacsController extends Controller
{
    
    public function udacs(Request $request)
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

        $query = Udac::select(\DB::raw('udacs.*'))
        ->join('primary_books', 'primary_books.id', '=', 'udacs.primary_book_id')
        ->join('ad_types', 'ad_types.id', '=', 'udacs.ad_type_id')
        ->orderBy(Udac::orderField($sort_name), $sort_dir);
                
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = Udac::filterOn($key, $filter);
            }
        }
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  Udac::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function udacByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => Udac::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newUdac(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        Udac::rules(),
        Udac::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $udac = Udac::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $udac->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editUdac(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        Udac::rules($id),
        Udac::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $udac = Udac::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $udac->fill($request->all());
        $udac->save();
        return response()->json([
        'updated' => true,
        'data' => $udac->toArray()
        ], 201);
    }
    
    public function deleteUdac(Request $request)
    {
        $id = $request->input('id');
        try {
            $udac = Udac::findOrFail($id);

            if(!$udac->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            }

            $udac->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}