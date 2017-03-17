<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocalForeign extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:local_foreigns,name,'.$id,
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That local\/foreign name has already been used.',
        'name.required' => 'A name is required for the local\/foreign.',
        ];
    }
    
}