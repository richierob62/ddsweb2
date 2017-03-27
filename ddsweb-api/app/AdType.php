<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdType extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:ad_types,name,'.$id,
        'code' => 'required|unique:ad_types,code,'.$id,
        'page_type'  => 'exists:page_types,id',
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'An ad type name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'An ad type code is required.',
        
        'page_type.exists' => 'You must select a valid page type.',

        ];
    }


    public function page_type() { return $this->belongsTo(PageType::class, 'page_type');  }


    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                return $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'page_type':
                return $query->whereHas('page_type', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
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
            case 'page_type':
                return $query->whereHas('page_type', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            default:
                return $query->orderBy($sort_name, $sort_dir);
        }
    }
}