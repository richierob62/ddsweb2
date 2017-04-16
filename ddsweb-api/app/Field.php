<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:fields,name,'.$id,
        'description' => 'required|unique:fields,description,'.$id,
        'input_type' => 'required|in:text,select,typeahead'
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That field name has already been used.',
        'name.required' => 'A field name is required.',
        'description.unique' => 'That field description has already been used.',
        'description.required' => 'A field description is required.',
        'input_type.required' => 'An input type is required.',
        'input_type.in' => 'The input type must be text, select or typeahead'
        ];
    }

    public function okToDelete() {
        return $this->ad_types()->count() == 0;
    }

    public function ad_types() {
        return $this->belongsToMany(AdType::class, 'ad_type_field')
                    ->withPivot('sequence')
                    ->withTimestamps();  
    }    
    
    public function order_lines() { return $this->belongsToMany(OrderLine::class, 'field_order_line')
        ->withPivot(['value' ])
        ->withTimestamps();
    }


    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'description':
                $query->where('description', 'LIKE', '%'.$filter.'%');
                break;
            case 'input_type':
                $query->where('input_type', 'LIKE', '%'.$filter.'%');
                break;
            case 'ref_table':
                $query->where('ref_table', 'LIKE', '%'.$filter.'%');
                break;
            case 'filter_fld':
                $query->where('filter_fld', 'LIKE', '%'.$filter.'%');
                break;
            case 'filter_val':
                $query->where('filter_val', 'LIKE', '%'.$filter.'%');
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