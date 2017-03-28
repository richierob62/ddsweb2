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
    
    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                return $query->where('code', 'LIKE', '%'.$filter.'%');
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