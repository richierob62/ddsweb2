<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrimaryBook extends Model
{
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
        // 'pub_month',
        // 'sales_start',
        // 'sales_close'
    ];

    public static function rules($id = null)
    {
        return [
            'name' => 'required|unique:primary_books,name,' . $id,
            'code' => 'required|unique:primary_books,code,' . $id,
            'pub_month' => 'required|date',
            'sales_start' => 'required|date',
            'sales_close' => 'required|date',
        ];
    }

    public static function errorMessages()
    {
        return [
            'name.unique' => 'That name has already been used.',
            'name.required' => 'A primary book name is required.',
            'code.unique' => 'That code has already been used.',
            'code.required' => 'A primary book code is required.',
            'pub_month.date' => 'Publication month must be a valid date.',
            'pub_month.required' => 'A publication month is required.',
            'sales_start.date' => 'Sales start must be a valid date.',
            'sales_start.required' => 'A sales start date is required.',
            'sales_close.date' => 'Sales close must be a valid date.',
            'sales_close.required' => 'A sales close date is required.',
        ];
    }

    public function okToDelete()
    {
        return ($this->customers()->count() == 0) &&
            ($this->orders()->count() == 0) &&
            ($this->udacs()->count() == 0);
    }
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function udacs()
    {
        return $this->hasMany(Udac::class);
    }
    public function source_books()
    {
        return $this->belongsToMany(SourceBook::class);
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['primary_books.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['primary_books.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'pub_month':
                    $filter_array[] = ['primary_books.pub_month', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'yppa_num':
                    $filter_array[] = ['primary_books.yppa_num', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'sales_start':
                    $filter_array[] = ['primary_books.sales_start', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'sales_close':
                    $filter_array[] = ['primary_books.sales_close', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['primary_books.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'foo':
                return 'huh';
                break;
            default:
                return $sort_name;
        }
    }
}
