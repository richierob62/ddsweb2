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
        'primary_book'  => 'exists:primary_books,id',
        'customer' => 'exists:customers,id',
        'order_status' => 'exists:order_statuses,id',
        'sales_rep' => 'exists:sales_reps,id'
        ];
    }
    
    static public function errorMessages() {
        return [
        'order_num.unique' => 'That order number has already been used.',
        
        'order_num.required' => 'An order number is required.',
        'order_date.required' => 'An order date is required.',
        
        'primary_book.exists' => 'You must select a primary book.',
        'customer.exists' => 'You must select a customer.',
        'order_status.exists' => 'You must select an order status.',
        'sales_rep.exists' => 'You must select a sales rep.',
        
        'order_date.date' => 'The order date must be a valid date.',
        
        ];
    }
    
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book');  }
    public function customer() { return $this->belongsTo(Customer::class, 'customer');  }
    public function order_status() { return $this->belongsTo(OrderStatus::class, 'order_status');  }
    public function sales_rep() { return $this->belongsTo(SalesRep::class, 'sales_rep');  }
    
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

    static public function scopeSortResultsBy($query, $sort_order_num, $sort_dir) {
        switch ($sort_order_num) {
            case 'sales_rep':
                return $query->whereHas('sales_rep', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
            });
            break;
        case 'primary_book':
            return $query->whereHas('primary_book', function($q) use ($filter, $sort_dir) {
                $q->orderBy('name', $sort_dir);
        });
        break;
        case 'customer':
            return $query->whereHas('customer', function($q) use ($filter, $sort_dir) {
                $q->orderBy('name', $sort_dir);
        });
        break;
        case 'order_status':
            return $query->whereHas('order_status', function($q) use ($filter, $sort_dir) {
                $q->orderBy('name', $sort_dir);
        });
        break;
        default:
            return $query->orderBy($sort_order_num, $sort_dir);
        }
    }
}