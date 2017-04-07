<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:fields,name,'.$id,
        'description' => 'required|unique:fields,description,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That field name has already been used.',
        'name.required' => 'A field name is required.',
        'description.unique' => 'That field description has already been used.',
        'description.required' => 'A field description is required.'
        ];
    }

    public function ad_types() {
        return $this->belongsToMany(AdType::class, 'ad_type_fields')
                    ->withPivot('sequence')
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