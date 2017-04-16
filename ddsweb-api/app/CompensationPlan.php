<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompensationPlan extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:compensation_plans,name,'.$id,
        'code' => 'required|unique:compensation_plans,code,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A compensation plan name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A compensation plan code is required.'
        ];
    }
    

    public function okToDelete() {
        return $this->sales_reps()->count() == 0;
    }

    public function sales_reps() { return $this->hasMany(SalesRep::class);  }
    
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