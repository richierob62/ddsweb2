<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    protected $guarded = [];

    public static function rules($id = null)
    {
        return [
            'order_id' => 'required|exists:orders,id',
            'udac_id' => 'required|exists:udacs,id',
        ];
    }

    public static function errorMessages()
    {
        return [
            'order_id.exists' => 'You must select a valid order number.',
            'udac_id.exists' => 'You must select a valid udac.',
            'order_id.required' => 'An order number is required.',
            'udac_id.required' => 'A udac is required.',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function udac()
    {
        return $this->belongsTo(Udac::class, 'udac_id');
    }
    public function fields()
    {
        return $this->belongsToMany(Field::class, 'field_order_line')
            ->withPivot(['value'])
            ->withTimestamps();
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'order':
                    $filter_array[] = ['orders.order_num', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'udac':
                    $filter_array[] = ['udacs.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['order_lines.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'order_lines.order':
                return 'orders.order_num';
                break;
            case 'order_lines.udac':
                return 'udacs.name';
                break;
            default:
                return $sort_name;
        }
    }
}
