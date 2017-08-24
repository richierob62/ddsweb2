<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalesRep extends Model
{
    protected $guarded = [];

    public static function rules($id = null)
    {
        return [
            'name' => 'required|unique:sales_reps,name,' . $id,
            'code' => 'required|unique:sales_reps,code,' . $id,
            'email' => 'email|unique:sales_reps,email,' . $id,
            'phone' => 'required|unique:sales_reps,phone,' . $id,
            'compensation_plan_id' => 'required|exists:compensation_plans,id',
        ];
    }

    public static function errorMessages()
    {
        return [
            'name.unique' => 'That name has already been used.',
            'name.required' => 'A sales rep name is required.',
            'code.unique' => 'That code has already been used.',
            'code.required' => 'A sales rep code is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'That email has already been used.',
            'phone.unique' => 'That phone number has already been used.',
            'phone.required' => 'A phone number is required.',
            'compensation_plan_id.required' => 'A compensation plan is required.',
            'compensation_plan_id.exists' => 'You must select a valid compensation plan.',
        ];
    }

    public function okToDelete()
    {
        return $this->customers()->count() == 0 && $this->orders()->count() == 0;
    }
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function compensation_plan()
    {
        return $this->belongsTo(CompensationPlan::class, 'compensation_plan_id');
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'code':
                    $filter_array[] = ['sales_reps.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'name':
                    $filter_array[] = ['sales_reps.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'email':
                    $filter_array[] = ['sales_reps.email', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'address':
                    $filter_array[] = ['sales_reps.address', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'city':
                    $filter_array[] = ['sales_reps.city', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'state':
                    $filter_array[] = ['sales_reps.state', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'zip':
                    $filter_array[] = ['sales_reps.zip', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['sales_reps.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function orderField($sort_name)
    {
        // switch ($sort_name) {
        //     case 'customers.sales_rep':
        //         return 'sales_reps.name';
        //         break;
        //     default:
        // }
        return $sort_name;
    }
}
