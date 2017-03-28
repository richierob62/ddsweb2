<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalesRep extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:sales_reps,name,'.$id,
        'code' => 'required|unique:sales_reps,code,'.$id,
        'email' => 'email|unique:sales_reps,email,'.$id,
        'phone' => 'required|unique:sales_reps,phone,'.$id,
        'compensation_plan' => 'required|exists:compensation_plans,id',
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A sales rep name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A sales rep code is required.',
        'email.email' => 'The email must be a valid email address.',
        'email.unique' => 'That email has already been used.',
        'phone.unique' => 'That phone number has already been used.',
        'phone.required' => 'A phone number is required.',
        'compensation_plan.required' => 'A compensation plan is required.',
        'compensation_plan.exists' => 'You must select a valid compensation plan.'
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
            case 'phone':
                return $query->where('phone', 'LIKE', '%'.$filter.'%');
                break;
            case 'is_rep':
                return $query->where('is_rep', $filter);
                break;
            case 'is_admin':
                return $query->where('is_admin', $filter);
                break;
            case 'is_active':
                return $query->where('is_active', $filter);
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