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
        'category'  => 'required',
        'local_foreign' => 'required',
        'pay_plan' => 'required',
        'primary_book'  => 'required',
        'sales_rep' => 'required',
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

        'billing_email.email' => 'The billing email must be a valid email address.',
        'email.email' => 'The email must be a valid email address.'
        
        ];
    }
    
}