<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalesRep extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:sales_reps,name,'.$id,
        'email' => 'email|unique:sales_reps,email,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A sales rep name is required.',
        'email.email' => 'The email must be a valid email address.',
        'email.unique' => 'That email has already been used.'
        ];
    }
    
    public function customers() { return $this->hasMany(Customer::class);  }
    
    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'email':
                return $query->where('email', 'LIKE', '%'.$filter.'%');
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
            case 'xxx':
                break;
            default:
                return $query->orderBy($sort_name, $sort_dir);
        }        
    }
}