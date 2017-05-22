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
        'category_id'  => 'required|exists:categories,id',
        'local_foreign_id' => 'required|exists:local_foreigns,id',
        'pay_plan_id' => 'required|exists:pay_plans,id',
        'primary_book_id'  => 'required|exists:primary_books,id',
        'sales_rep_id' => 'required|exists:sales_reps,id',
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
        
        'category_id.exists' => 'You must select a valid category.',
        'local_foreign_id.exists' => 'You must select a valid local/foreign.',
        'pay_plan_id.exists' => 'You must select a valid pay plan.',
        'primary_book_id.exists' => 'You must select a valid primary book.',
        'sales_rep_id.exists' => 'You must select a valid sales rep.',
        
        'category_id.required' => 'You must select a valid category.',
        'local_foreign_id.required' => 'You must select a valid local/foreign.',
        'pay_plan_id.required' => 'You must select a valid pay plan.',
        'primary_book_id.required' => 'You must select a valid primary book.',
        'sales_rep_id.required' => 'You must select a valid sales rep.',
        
        'billing_email.email' => 'The billing email must be a valid email address.',
        'email.email' => 'The email must be a valid email address.'
        
        ];
    }
    
    public function okToDelete() {
        return $this->orders()->count() == 0;
    }
    public function orders() { return $this->hasMany(Order::class); }
    
    public function category() { return $this->belongsTo(Category::class, 'category_id');  }
    public function local_foreign() { return $this->belongsTo(LocalForeign::class, 'local_foreign_id');  }
    public function pay_plan() { return $this->belongsTo(PayPlan::class, 'pay_plan_id');  }
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book_id');  }
    public function sales_rep() { return $this->belongsTo(SalesRep::class, 'sales_rep_id');  }
    
    static public function buildFilter($filters)
    {
        $filter_array = [];
        foreach( $filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] =  ['customers.name', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'address':
                    $filter_array[] =  ['customers.address', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'city':
                    $filter_array[] =  ['customers.city', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'state':
                    $filter_array[] =  ['customers.state', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'account_num':
                    $filter_array[] =  ['customers.account_num', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'sales_rep':
                    $filter_array[] =  ['sales_reps.name', 'LIKE', '%'.$filter.'%'];
                    break;
                case 'id':
                    $filter_array[] =  ['customers.id', '=', $filter];
                    break;
        }
    }
    return $filter_array;
}

static public function orderField($sort_name) {
    switch ($sort_name) {
        case 'customers.sales_rep':
            return 'sales_reps.name';
            break;
        default:
            return $sort_name;
    }
}

}