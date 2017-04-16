<?php

namespace App\Http\Controllers;

use App\SalesRep;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class SalesRepsController
* @package App\Http\Controllers
*/
class SalesRepsController extends Controller
{
    
    public function salesReps(Request $request)
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
        
        $query = SalesRep::select(\DB::raw('sales_reps.*'))
        ->orderBy(SalesRep::orderField($sort_name), $sort_dir); 

        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = SalesRep::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  SalesRep::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function salesRepByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => SalesRep::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newSalesRep(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        SalesRep::rules(),
        SalesRep::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $sales_rep = SalesRep::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $sales_rep->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editSalesRep(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        SalesRep::rules($id),
        SalesRep::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $sales_rep = SalesRep::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $sales_rep->fill($request->all());
        $sales_rep->save();
        return response()->json([
        'updated' => true,
        'data' => $sales_rep->toArray()
        ], 201);
    }
    
    public function deleteSalesRep(Request $request)
    {
        $id = $request->input('id');
        try {
            $sales_rep = SalesRep::findOrFail($id);

            if(!$sales_rep->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            } 
                       
            $sales_rep->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
}