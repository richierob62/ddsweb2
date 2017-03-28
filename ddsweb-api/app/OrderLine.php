<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'heading'  => 'exists:headings,id',
        'order'  => 'exists:orders,id',
        'udac'  => 'exists:udacs,id',
        'sequence' => 'required|integer'
        ];
    }
            
    static public function errorMessages() {
        return [
            
        'sequence.required' => 'A sequence number is required.',
        
        'order.exists' => 'You must select a valid order number.',
        'udac.exists' => 'You must select a valid udac.',
        'heading.exists' => 'You must select a valid heading.'
        
        ];
    }
    
    public function order() { return $this->belongsTo(Order::class, 'order');  }
    public function udac() { return $this->belongsTo(Udac::class, 'udac');  }
    public function heading() { return $this->belongsTo(Heading::class, 'heading');  }
    
    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'order':
                return $query->whereHas('order', function($q) use ($filter) {
                    $q->where('order_num', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'udac':
                return $query->whereHas('udac', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'heading':
                return $query->whereHas('heading', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;        
            case 'sequence':
                return $query->where('sequence', $filter);
                break;                        
            case 'id':
                return $query->where('id', $filter);
                break;
            default:
                return $query;
        }
    }

    static public function sortResultsBy($code, $sort_dir, $query) {
        switch ($code) {
            case 'order':
                return $query->whereHas('order', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('order_num', $sort_dir);
                })->orderBy('sequence', 'asc');
                break;
            case 'udac':
                return $query->whereHas('udac', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            case 'heading':
                return $query->whereHas('heading', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            default:
                return $query->orderBy($code, $sort_dir);
        }        
    }
}