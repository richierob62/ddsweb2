<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];

    public static function rules($id = null)
    {
        return [
            'name' => 'required|unique:categories,name,' . $id,
            'code' => 'required|unique:categories,code,' . $id,
        ];
    }

    public static function errorMessages()
    {
        return [
            'name.unique' => 'That name has already been used.',
            'name.required' => 'A category name is required.',
            'code.unique' => 'That code has already been used.',
            'code.required' => 'A category code is required.',
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
                    $filter_array[] = ['categories.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['categories.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['categories.id', '=', $filter];
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
