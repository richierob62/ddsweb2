<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PageType extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:page_types,name,'.$id,
        'code' => 'required|unique:page_types,code,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A page type name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A page type code is required.'
        ];
    }
    
    public function customers() { return $this->hasMany(Customer::class);  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'id':
                $query->where('id', $filter);
                break;
            default:
                $query;
        }
    }
    
    static public function scopeSortResultsBy($query, $sort_name, $sort_dir) {
        switch ($sort_name) {
            case 'somerelativefield':
                break;
            default:
                $query->orderBy($sort_name, $sort_dir);
        }
    }
}