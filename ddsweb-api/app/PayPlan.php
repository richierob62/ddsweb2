<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PayPlan extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:pay_plans,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That pay plan name has already been used.',
        'name.required' => 'A name is required for the pay plan.',
        ];
    }
    
}