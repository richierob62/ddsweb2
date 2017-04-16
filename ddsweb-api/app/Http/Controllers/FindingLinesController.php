<?php

namespace App\Http\Controllers;

use App\FindingLine;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

/**
* Class FindingLinesController
* @package App\Http\Controllers
*/
class FindingLinesController extends Controller
{
    
    public function findingLines(Request $request)
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
        
        $query = FindingLine::select(\DB::raw('finding_lines.*'))
        ->orderBy(FindingLine::orderField($sort_name), $sort_dir);
        
        if(sizeof($filters) > 0) {
            foreach( $filters as $key => $filter) {
                $query = FindingLine::filterOn($key, $filter);
            }
        }
        
        
        return response()->json(['data' => $query->get()]);
    }
    
    public function referenceList() {
        $refs =  FindingLine::orderBy('name')->get(['id', 'name'])
        ->map( function ($item) {
            return ['id' => $item->id, 'display' => $item->name ];
        });
        return response()->json(['data' => $refs]);
    }
    
    public function findingLineByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => FindingLine::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }
    
    public function newFindingLine(Request $request)
    {
        $validator = Validator::make(
        $request->all(),
        FindingLine::rules(),
        FindingLine::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            
            $finding_line = FindingLine::create($request->all());
            return response()->json([
            'created' => true,
            'data' => $finding_line->toArray()
            ], 201);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['error' => 'Not Created'],404);
            
        };
        
    }
    
    public function editFindingLine(Request $request)
    {
        
        $id = $request->input('id');
        
        $validator = Validator::make(
        $request->all(),
        FindingLine::rules($id),
        FindingLine::errorMessages()
        );
        
        if($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        
        try {
            $finding_line = FindingLine::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
        
        $finding_line->fill($request->all());
        $finding_line->save();
        return response()->json([
        'updated' => true,
        'data' => $finding_line->toArray()
        ], 201);
    }
    
    public function deleteFindingLine(Request $request)
    {
        $id = $request->input('id');
        try {
            $finding_line = FindingLine::findOrFail($id);

            if(!$finding_line->okToDelete()) {
                return response()->json(['error' => 'Cannot be deleted: Being used'],422);
            }

            $finding_line->delete();
            return response()->json([
            'deleted' => true,
            'id' => $id
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found'],404);
        }
    }

}