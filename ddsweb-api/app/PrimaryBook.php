<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PrimaryBook extends Model
{
    protected $guarded = [];
    
    protected $dates = [
    'created_at',
    'updated_at',
    'deleted_at',
    'pub_month',
    'sales_start',
    'sales_close'
    ];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:primary_books,name,'.$id,
        'code' => 'required|unique:primary_books,code,'.$id,
        'pub_month' => 'required|date',
        'sales_start' => 'required|date',
        'sales_close' => 'required|date'
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A primary book name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A primary book code is required.',
        'pub_month.date' => 'Publication month must be a valid date.',
        'pub_month.required' => 'A publication month is required.',
        'sales_start.date' => 'Sales start must be a valid date.',
        'sales_start.required' => 'A sales start date is required.',
        'sales_close.date' => 'Sales close must be a valid date.',
        'sales_close.required' => 'A sales close date is required.',
        ];
    }
    
    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                return $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'pub_month':
                return $query->whereMonth('pub_month', '=', date('m', strtotime($filter)) )
                ->whereYear('pub_month', '=', date('Y', strtotime($filter)) );
                break;
            case 'id':
                return $query->where('id', $filter);
                break;
            default:
                return $query;
        }
    }
    
    static public function sortResultsBy($sort_name, $sort_dir, $query) {
        switch ($sort_name) {
            case 'somerelativefield':
                break;
            default:
                return $query->orderBy($sort_name, $sort_dir);
        }
    }
}