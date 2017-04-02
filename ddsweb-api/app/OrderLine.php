<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'order_id'  => 'required|exists:orders,id',
        'udac_id'  => 'required|exists:udacs,id',
        ];
    }
            
    static public function errorMessages() {
        return [
        'order_id.exists' => 'You must select a valid order number.',
        'udac_id.exists' => 'You must select a valid udac.',
        'order_id.required' => 'An order number is required.',
        'udac_id.required' => 'A udac is required.',
        ];
    }
    
    public function order() { return $this->belongsTo(Order::class, 'order_id');  }
    public function udac() { return $this->belongsTo(Udac::class, 'udac_id');  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'order':
                $query->whereHas('order', function($q) use ($filter) {
                    $q->where('order_num', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'udac':
                $query->whereHas('udac', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;
            // case 'heading':
            //     $query->whereHas('heading', function($q) use ($filter) {
            //         $q->where('name', 'LIKE', '%'.$filter.'%');
            //     });
            //     break;        
            // case 'sequence':
            //     $query->where('sequence', $filter);
            //     break;                        
            case 'id':
                $query->where('id', $filter);
                break;
            default:
                $query;
        }
    }

    static public function orderField($sort_name) {
        switch ($sort_name) {
            case 'order':
            return 'orders.order_num';
            break;
            case 'udac':
            return 'udacs.name';
            break;
            default:
            return $sort_name;
        }  
    }

}