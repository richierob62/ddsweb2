<?php

namespace App\Http\Controllers;

use App\SalesRep;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Validator;

/*
 * Class SalesRepsController
 * @package App\Http\Controllers
 */
class SalesRepsController extends Controller
{

    public function salesReps(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'sales_reps.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {
            $filter_array = $filters ? SalesRep::buildFilter($filters) : [];

            $query = SalesRep::select(\DB::raw('sales_reps.*'))
                ->where($filter_array)
                ->orderBy(SalesRep::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = SalesRep::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
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
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newSalesRep(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            SalesRep::rules(),
            SalesRep::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $data = $request->all();
            $data['password'] = Hash::make($request->password);
            $sales_rep = SalesRep::create($data);
            return response()->json([
                'created' => true,
                'data' => $sales_rep->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
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

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $sales_rep = SalesRep::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $sales_rep->fill($request->all());
        $sales_rep->save();
        return response()->json([
            'updated' => true,
            'data' => $sales_rep->toArray(),
        ], 200);
    }

    public function deleteSalesRep(Request $request)
    {
        $id = $request->input('id');
        try {
            $sales_rep = SalesRep::findOrFail($id);

            if (!$sales_rep->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $sales_rep->delete();
            return response()->json([
                'deleted' => true,
                'id' => $id,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }
    }

    protected function buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir)
    {
        $cache_key = 'sales_reps.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'sales_rep_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }

    public function login(Request $request)
    {
        try {
            $user = SalesRep::where('email', $request->email)->firstOrFail();
            if (!$user || !(Hash::check($request->password, $user->password))) {
                return response()->json(['errors' => ['That Email-Password combination wasn\'t found']]);
            }
            $token = $this->generateToken();
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
            return response()->json(['errors' => ['That Email-Password combination wasn\'t found']]);
        }
    }

    public function generateToken()
    {
        $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEF!@_GHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($keyspace) - 1;
        $str = '';
        for ($i = 0; $i < 64; $i++) {
            $str .= $keyspace[random_int(0, $max)];
        }
        return $str;
    }
}
