<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class SourceBook extends Model
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
        'name' => 'required|unique:source_books,name,'.$id,
        'code' => 'required|unique:source_books,code,'.$id,
        'pub_month' => 'required|date',
        'sales_start' => 'required|date',
        'sales_close' => 'required|date'
        ];
    }
    
    public static function errorMessages()
    {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A source book name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A source book code is required.',
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
        return $this->primary_books()->count() == 0;
    }

    public function primary_books()
    {
        return $this->belongsToMany(PrimaryBook::class);
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['source_books.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['source_books.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'pub_month':
                    // handled by special function
                    break;
                case 'id':
                    $filter_array[] = ['source_books.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }

    public static function pubMonthFilter($query, $pub_date)
    {
        if (app()->environment() == 'testing') {
            // strftime('%m', source_books.pub_month )
            return $query->whereRaw('cast( strftime(\'%m\', source_books.pub_month ) as INTEGER)  = ? ', [(int) date('m', strtotime($pub_date))])
                ->whereRaw('cast( strftime(\'%Y\', source_books.pub_month ) as INTEGER)  = ? ', [(int) date('Y', strtotime($pub_date))]);
        }

        return $query->whereRaw('MONTH(source_books.pub_month) = ? ', [(int) date('m', strtotime($pub_date))])
            ->whereRaw('YEAR(source_books.pub_month) = ? ', [(int) date('Y', strtotime($pub_date))]);

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
