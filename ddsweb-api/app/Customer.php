<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:customers,name,'.$id,
        'account_num' => 'required|unique:customers,account_num,'.$id,
        'category'  => 'exists:categories,id',
        'local_foreign' => 'exists:local_foreigns,id',
        'pay_plan' => 'exists:pay_plans,id',
        'primary_book'  => 'exists:primary_books,id',
        'sales_rep' => 'exists:sales_reps,id',
        'billing_email' => 'email',
        'email' => 'email'
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That company name has already been used.',
        'account_num.unique' => 'That account number has already been used.',
        
        'account_num.required' => 'An account number is required.',
        'name.required' => 'A company name is required.',
        
        'category.exists' => 'You must select a valid category.',
        'local_foreign.exists' => 'You must select a valid local/foreign.',
        'pay_plan.exists' => 'You must select a valid pay plan.',
        'primary_book.exists' => 'You must select a valid primary book.',
        'sales_rep.exists' => 'You must select a valid sales rep.',
        
        'billing_email.email' => 'The billing email must be a valid email address.',
        'email.email' => 'The email must be a valid email address.'
        
        ];
    }
    
    public function category() { return $this->belongsTo(Category::class, 'category');  }
    public function local_foreign() { return $this->belongsTo(LocalForeign::class, 'local_foreign');  }
    public function pay_plan() { return $this->belongsTo(PayPlan::class, 'pay_plan');  }
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book');  }
    public function sales_rep() { return $this->belongsTo(SalesRep::class, 'sales_rep');  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'address':
                return $query->where('address', 'LIKE', '%'.$filter.'%');
                break;
            case 'city':
                return $query->where('city', 'LIKE', '%'.$filter.'%');
                break;
            case 'state':
                return $query->where('state', 'LIKE', '%'.$filter.'%');
                break;
            case 'account_num':
                return $query->where('account_num', 'LIKE', '%'.$filter.'%');
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

    static public function scopeSortResultsBy($query, $sort_name, $sort_dir) {
        switch ($sort_name) {
            case 'sales_rep':
                return $query->whereHas('sales_rep', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            default:
                return $query->orderBy($sort_name, $sort_dir);
        }        
    }
}