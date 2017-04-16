<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class SourceBook extends Model
{
    protected $guarded = [];
    
    protected $dates = [
    'created_at',
    'updated_at',
    'deleted_at',
    // 'pub_month',
    // 'sales_start',
    // 'sales_close'
    ];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:source_books,name,'.$id,
        'code' => 'required|unique:source_books,code,'.$id,
        'pub_month' => 'required|date',
        'sales_start' => 'required|date',
        'sales_close' => 'required|date'
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A source book name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A source book code is required.',
        'pub_month.date' => 'Publication month must be a valid date.',
        'pub_month.required' => 'A publication month is required.',
        'sales_start.date' => 'Sales start must be a valid date.',
        'sales_start.required' => 'A sales start date is required.',
        'sales_close.date' => 'Sales close must be a valid date.',
        'sales_close.required' => 'A sales close date is required.',
        ];
    }

    public function okToDelete() {
        return $this->primary_books()->count() == 0;
    }

    public function primary_books() { return $this->belongsToMany(PrimaryBook::class); }

    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'pub_month':
                $query->whereMonth('pub_month', '=', date('m', strtotime($filter)) )
                ->whereYear('pub_month', '=', date('Y', strtotime($filter)) );
                break;
            case 'id':
                $query->where('id', $filter);
                break;
            default:
                $query;
        }
    }
    
    static public function orderField($sort_name) {
        switch ($sort_name) {
            case 'foo':
            return 'huh';
            break;
            default:
            return $sort_name;
        }  
    }
    
}