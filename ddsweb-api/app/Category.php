<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:categories,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That category name has already been used.',
        'name.required' => 'A name is required for the category.',
        ];
    }
    
}