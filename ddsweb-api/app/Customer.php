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
        'category'  => 'required|exists:categories,id',
        'local_foreign' => 'required|exists:local_foreigns,id',
        'pay_plan' => 'required|exists:pay_plans,id',
        'primary_book'  => 'required|exists:primary_books,id',
        'sales_rep' => 'required|exists:sales_reps,id',
        'billing_email' => 'email',
        'email' => 'email'
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That company name has already been used.',
        'account_num.unique' => 'That account number has already been used.',
        
        'account_num.required' => 'An account number is required.',
        'category.required' => 'You must select a category.',
        'local_foreign.required' => 'You must select local/foreign.',
        'name.required' => 'A company name is required.',
        'pay_plan.required' => 'You must select a pay plan.',
        'primary_book.required' => 'You must select a primary book.',
        'sales_rep.required' => 'You must select a sales rep.',

        'category.exists' => 'You must select a valid category.',
        'local_foreign.exists' => 'You must select a valid local/foreign.',
        'pay_plan.exists' => 'You must select a valid pay plan.',
        'primary_book.exists' => 'You must select a valid primary book.',
        'sales_rep.exists' => 'You must select a valid sales rep.',

        'billing_email.email' => 'The billing email must be a valid email address.',
        'email.email' => 'The email must be a valid email address.'
        
        ];
    }

    public function category() { return $this->hasOne(Category::class);  }
    public function local_foreign() { return $this->hasOne(LocalForeign::class);  }
    public function pay_plan() { return $this->hasOne(PayPlan::class);  }
    public function primary_book() { return $this->hasOne(PrimaryBook::class);  }
    public function sales_rep() { return $this->hasOne(SalesRep::class);  }

}