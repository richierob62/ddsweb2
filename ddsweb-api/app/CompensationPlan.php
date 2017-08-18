<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompensationPlan extends Model
{
    protected $guarded = [];

    public static function rules($id = null)
    {
        return [
            'name' => 'required|unique:compensation_plans,name,' . $id,
            'code' => 'required|unique:compensation_plans,code,' . $id,
        ];
    }

    public static function errorMessages()
    {
        return [
            'name.unique' => 'That name has already been used.',
            'name.required' => 'A compensation plan name is required.',
            'code.unique' => 'That code has already been used.',
            'code.required' => 'A compensation plan code is required.',
        ];
    }

    public function okToDelete()
    {
        return $this->sales_reps()->count() == 0;
    }

    public function sales_reps()
    {
        return $this->hasMany(SalesRep::class);
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['compensation_plans.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['compensation_plans.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'sales_rep':
                    $filter_array[] = ['sales_reps.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['compensation_plans.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'customers.sales_rep':
                return 'sales_reps.name';
                break;
            default:
                return $sort_name;
        }
    }
}
