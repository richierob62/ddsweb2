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
    
    static public function rules($id = null) {
        return [
        'order_num' => 'required|unique:orders,order_num,'.$id,
        'order_date' => 'required|date',
        'primary_book_id'  => 'exists:primary_books,id',
        'customer_id' => 'exists:customers,id',
        'order_status_id' => 'exists:order_statuses,id',
        'sales_rep_id' => 'exists:sales_reps,id'
        ];
    }
    
    static public function errorMessages() {
        return [
        'order_num.unique' => 'That order number has already been used.',
        
        'order_num.required' => 'An order number is required.',
        'order_date.required' => 'An order date is required.',
        
        'primary_book_id.exists' => 'You must select a primary book.',
        'customer_id.exists' => 'You must select a customer.',
        'order_status_id.exists' => 'You must select an order status.',
        'sales_rep_id.exists' => 'You must select a sales rep.',
        
        'order_date.date' => 'The order date must be a valid date.',
        
        ];
    }
    
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book_id');  }
    public function customer() { return $this->belongsTo(Customer::class, 'customer_id');  }
    public function order_status() { return $this->belongsTo(OrderStatus::class, 'order_status_id');  }
    public function sales_rep() { return $this->belongsTo(SalesRep::class, 'sales_rep_id');  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'order_num':
                return $query->where('order_num', 'LIKE', '%'.$filter.'%');
                break;
            case 'order_date':
                return $query->where('order_date', 'LIKE', '%'.$filter.'%');
                break;
            case 'primary_book':
                return $query->whereHas('primary_book', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
            });
            break;
            case 'customer':
                return $query->whereHas('customer', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
            });
            break;
            case 'order_status':
                return $query->whereHas('order_status', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
            });
            break;
            case 'sales_rep':
                return $query->whereHas('sales_rep', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
            });
            break;
            case 'id':
                return $query->where('id', $filter);
                break;
            default:
                return $query;
        }
    }

    static public function orderField($sort_name) {
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

}