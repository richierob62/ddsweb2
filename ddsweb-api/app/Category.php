<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:categories,name,'.$id,
        'code' => 'required|unique:categories,code,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A category name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A category code is required.'
        ];
    }

    public function okToDelete() {
        return $this->customers()->count() == 0;
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