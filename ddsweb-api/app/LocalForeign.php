<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocalForeign extends Model
{
    protected $guarded = [];
    
    public static function rules($id = null)
    {
        return [
        'name' => 'required|unique:local_foreigns,name,'.$id,
        'code' => 'required|unique:local_foreigns,code,'.$id
        ];
    }
    
    public static function errorMessages()
    {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A local\/foreign name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A local\/foreign code is required.'
        ];
    }

    public function okToDelete()
    {
        return $this->customers()->count() == 0;
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
    
    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['local_foreigns.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['local_foreigns.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['local_foreigns.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }
    
    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'foo':
            return 'huh';
            break;
            default:
            return $sort_name;
        }
    }
}
