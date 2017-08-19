<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
        // 'order_date'
    ];

    public static function rules($id = null)
    {
        return [
            'order_num' => 'required|unique:orders,order_num,' . $id,
            'order_date' => 'required|date',
            'primary_book_id' => 'required|exists:primary_books,id',
            'customer_id' => 'required|exists:customers,id',
            'order_status_id' => 'required|exists:order_statuses,id',
            'sales_rep_id' => 'required|exists:sales_reps,id',
        ];
    }

    public static function errorMessages()
    {
        return [
            'order_num.unique' => 'That order number has already been used.',

            'order_num.required' => 'An order number is required.',
            'order_date.required' => 'An order date is required.',

            'primary_book_id.exists' => 'You must select a primary book.',
            'customer_id.exists' => 'You must select a customer.',
            'order_status_id.exists' => 'You must select an order status.',
            'sales_rep_id.exists' => 'You must select a sales rep.',

            'primary_book_id.required' => 'You must select a primary book.',
            'customer_id.required' => 'You must select a customer.',
            'order_status_id.required' => 'You must select an order status.',
            'sales_rep_id.required' => 'You must select a sales rep.',

            'order_date.date' => 'The order date must be a valid date.',

        ];
    }

    public function primary_book()
    {
        return $this->belongsTo(PrimaryBook::class, 'primary_book_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function order_status()
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }
    public function sales_rep()
    {
        return $this->belongsTo(SalesRep::class, 'sales_rep_id');
    }
    public function order_lines()
    {
        return $this->hasMany(OrderLine::class);
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'order_num':
                    $filter_array[] = ['orders.order_num', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'order_date':
                    $filter_array[] = ['orders.order_date', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'primary_book':
                    $filter_array[] = ['primary_books.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'customer':
                    $filter_array[] = ['customers.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'order_status':
                    $filter_array[] = ['order_statuses.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'sales_rep':
                    $filter_array[] = ['sales_reps.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['orders.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'sales_rep':
                return 'sales_reps.name';
                break;
            case 'primary_book':
                return 'primary_books.name';
                break;
            case 'customer':
                return 'customers.name';
                break;
            case 'order_status':
                return 'order_statuses.name';
                break;
            default:
                return $sort_name;
        }
    }

    public function okToDelete()
    {
        return true;
    }

    public function deleteOrderAndLines()
    {
        OrderLine::where('order_id', $this->id)->delete();
        $this->delete();
    }
}
