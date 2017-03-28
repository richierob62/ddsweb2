<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FindingLine extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:finding_lines,name,'.$id,
        'code' => 'required|unique:finding_lines,code,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A finding line name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A finding line code is required.'
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