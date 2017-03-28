<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompensationPlan extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:compensation_plans,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A name is required for the compensation plan.',
        ];
    }
    
}