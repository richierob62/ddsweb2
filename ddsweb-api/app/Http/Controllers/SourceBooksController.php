<?php

namespace App\Http\Controllers;

use App\SourceBook;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

/*
 * Class SourceBooksController
 * @package App\Http\Controllers
 */
class SourceBooksController extends Controller
{

    public function sourceBooks(Request $request)
    {
        $filters = $request->input('filters');

        $sort_name = $request->input('sort_name');
        if (sizeof($sort_name) == 0) {
            $sort_name = 'name';
        }
        $sort_name = 'source_books.' . $sort_name;

        $sort_dir = $request->input('sort_dir');
        if (sizeof($sort_dir) == 0) {
            $sort_dir = 'asc';
        }

        // build cache key
        $cache_key = $this->buildFilteredCollectionCacheKey($filters, $sort_name, $sort_dir);

        $return_value = Cache::remember($cache_key, 0.1, function () use ($filters, $sort_name, $sort_dir) {

            $filter_array = $filters ? SourceBook::buildFilter($filters) : [];

            $query = SourceBook::select(\DB::raw('source_books.*'))
                ->where($filter_array);

            if ($filters && $filters['pub_month']) {
                $query = SourceBook::pubMonthFilter($query, $filters['pub_month']);
            }

            $query = $query->orderBy(SourceBook::orderField($sort_name), $sort_dir);

            return response()->json(['data' => $query->get()]);
        });

        return $return_value;
    }

    public function referenceList()
    {

        // build cache key
        $cache_key = $this->buildReferenceCollectionCacheKey();

        $return_value = Cache::remember($cache_key, 5, function () {
            $refs = SourceBook::orderBy('name')->get(['id', 'name'])
                ->map(function ($item) {
                    return ['id' => $item->id, 'display' => $item->name];
                });
            return response()->json(['data' => $refs]);
        });

        return $return_value;
    }

    public function sourceBookByID(Request $request)
    {
        $id = $request->input('id');
        try {
            return ['data' => SourceBook::findOrFail($id)->toArray()];
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function newSourceBook(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            SourceBook::rules(),
            SourceBook::errorMessages()
        );

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $source_book = SourceBook::create($request->all());
            return response()->json([
                'created' => true,
                'data' => $source_book->toArray(),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Created']]);
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

        if ($validator->fails()) {
            $messages = $this->flatteValidationMessages($validator->messages());
            return response()->json(['errors' => $messages]);
        }

        try {
            $source_book = SourceBook::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']]);
        }

        $source_book->fill($request->all());
        $source_book->save();
        return response()->json([
            'updated' => true,
            'data' => $source_book->toArray(),
        ], 200);
    }

    public function deleteSourceBook(Request $request)
    {
        $id = $request->input('id');
        try {
            $source_book = SourceBook::findOrFail($id);

            if (!$source_book->okToDelete()) {
                return response()->json(['errors' => ['Cannot be deleted: It is being used']]);
            }

            $source_book->delete();
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
        $cache_key = 'source_books.';
        if ($filters) {
            foreach ($filters as $key => $value) {
                $cache_key .= $key . $value;
            };
        }
        return $cache_key . '.' . $sort_name . '.' . $sort_dir;
    }

    protected function buildReferenceCollectionCacheKey()
    {
        return 'source_book_reference';
    }

    protected function flatteValidationMessages($messages)
    {
        return collect($messages)->map(function ($item) {
            return $item[0];
        });
    }

    public function attachSourceBook(Request $request)
    {
        $pb_id = $request->input('id');
        $source_book_id = $request->input('source_book');
        try {
            $source_book = SourceBook::findOrFail($pb_id);
            $source_book->source_books()->attach($source_book_id);
            return response()->json([
                'created' => true,
                'data' => [
                    'id' => $pb_id,
                    'source_book' => $source_book_id,
                ],
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

    public function removeSourceBook(Request $request)
    {
        $pb_id = $request->input('id');
        $source_book_id = $request->input('source_book');
        try {
            $source_book = SourceBook::findOrFail($pb_id);
            $source_book->source_books()->detach($source_book_id);
            return response()->json([
                'deleted' => true,
                'data' => [
                    'id' => $pb_id,
                    'source_book' => $source_book_id,
                ],
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => ['Not Found']], 200);
        }
    }

}
