<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrimaryBook extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:primary_books,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That primary book name has already been used.',
        'name.required' => 'A name is required for the primary book.',
        ];
    }
    
}