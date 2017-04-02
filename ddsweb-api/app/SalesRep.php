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
        'compensation_plan_id' => 'required|exists:compensation_plans,id',
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
        'compensation_plan_id.required' => 'A compensation plan is required.',
        'compensation_plan_id.exists' => 'You must select a valid compensation plan.'
        ];
    }
    
    public function compensation_plan() { return $this->belongsTo(CompensationPLan::class);  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {

        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'email':
                $query->where('email', 'LIKE', '%'.$filter.'%');
                break;
            case 'phone':
                $query->where('phone', 'LIKE', '%'.$filter.'%');
                break;
            case 'is_rep':
                $query->where('is_rep', $filter);
                break;
            case 'is_admin':
                $query->where('is_admin', $filter);
                break;
            case 'is_active':
                $query->where('is_active', $filter);
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