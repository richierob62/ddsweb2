<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Heading extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:headings,name,'.$id,
        'sort_name' => 'required|unique:headings,sort_name,'.$id,
        'heading_num' => 'required|unique:headings,heading_num,'.$id,
        'page_type'  => 'exists:page_types,id'
        ];
    }

    static public function errorMessages() {
        return [
        'name.unique' => 'That heading name has already been used.',
        'sort_name.unique' => 'That sort heading has already been used.',
        'heading_num.unique' => 'That heading number has already been used.',
        
        'name.required' => 'A heading name is required.',
        'sort_name.required' => 'A sort heading is required.',
        'heading_num.required' => 'A heading number is required.',
        
        'page_type.exists' => 'You must select a valid page type.',
        
        ];
    }
    
    public function page_type() { return $this->belongsTo(PageType::class, 'page_type');  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'sort_name':
                $query->where('sort_name', 'LIKE', '%'.$filter.'%');
                break;
            case 'heading_num':
                $query->where('heading_num', 'LIKE', '%'.$filter.'%');
                break;
            case 'page_type':
                $query->whereHas('page_type', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
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
            case 'page_type':
                $query->whereHas('page_type', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            default:
                $query->orderBy($sort_name, $sort_dir);
        }        
    }
}