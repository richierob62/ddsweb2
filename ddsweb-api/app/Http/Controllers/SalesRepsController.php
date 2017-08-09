<?php

namespace App\Http\Controllers;

use App\SalesRep;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;


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
        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();
        
        $return_value = Cache::remember($cache_key, 5, function() {
            
            $refs =  SalesRep::orderBy('name')->get(['id', 'name'])
            ->map( function ($item) {
                return ['id' => $item->id, 'display' => $item->name ];
            });
            return response()->json(['data' => $refs]);
        });
        
        return $return_value;
    }
    
    public function salesRepByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => SalesRep::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Not Found']);
        }
    }
    
    
    public function login(Request $request)
    {
        try {
            $user = SalesRep::where('email', $request->email)->firstOrFail();
            if (!$user || !(Hash::check($request->password, $user->password)) ) {
                return response()->json(['error' => ['That Email-Password combination wasn\'t found']]);
            }
            $token = $this->token();
            $user->token = $token;
            $user->save();
            $user = [
            'email' => $user->email,
            'name' => $user->name,
            'code' => $user->code,
            'token' => $token,
            ];
            return response()->json(['data' => $user]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'That Email-Password combination wasn\'t found']);
        }
    }
    
    function token()
    {
        $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEF!@_GHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($keyspace) -1;
        $str = '';
        for ($i = 0; $i < 64; $i++) {
            $str .= $keyspace[random_int(0, $max)];
        }
        return $str;
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
            
            return response()->json(['error' => 'Not Created']);
            
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
            return response()->json(['error' => 'Not Found']);
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
            return response()->json(['error' => 'Not Found']);
        }
    }
    
    protected function buildReferenceCollectionCacheKey() {
        return 'sales_rep_reference';
    }
}