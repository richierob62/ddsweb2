<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    protected $guarded = [];
    
    public static function rules($id = null)
    {
        return [
        'name' => 'required|unique:order_statuses,name,'.$id,
        'code' => 'required|unique:order_statuses,code,'.$id
        ];
    }
    
    public static function errorMessages()
    {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'An order status name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'An order status code is required.'
        ];
    }


    public function okToDelete()
    {
        return $this->orders()->count() == 0;
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['order_statuses.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['order_statuses.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['order_statuses.id', '=', $filter];
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
