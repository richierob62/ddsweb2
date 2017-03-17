<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalesRep extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:sales_reps,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That sales rep\'s name has already been used.',
        'name.required' => 'A name is required for the sales rep.',
        ];
    }
    
}