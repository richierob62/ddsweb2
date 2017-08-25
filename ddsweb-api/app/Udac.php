<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Udac extends Model
{
    protected $guarded = [];
    
    public static function rules($id = null)
    {
        return [
        'name' => 'required|unique:udacs,name,'.$id,
        'code' => 'required|unique:udacs,code,'.$id,
        'primary_book_id'  => 'required|exists:primary_books,id',
        'ad_type_id'  => 'required|exists:ad_types,id'
        ];
    }
    public static function errorMessages()
    {
        return [
            
        'name.unique' => 'That udac name has already been used.',
        'code.unique' => 'That udac code has already been used.',
        
        'name.required' => 'A udac name is required.',
        'code.required' => 'A udac code is required.',
        
        'primary_book_id.exists' => 'You must select a valid primary book.',
        'ad_type_id.exists' => 'You must select a valid ad type.',
        
        'primary_book_id.required' => 'You must select a valid primary book.',
        'ad_type_id.required' => 'You must select a valid ad type.'
        
        ];
    }

    public function okToDelete()
    {
        return $this->order_lines()->count() == 0;
    }
    public function order_lines()
    {
        return $this->hasMany(OrderLine::class);
    }

    public function primary_book()
    {
        return $this->belongsTo(PrimaryBook::class, 'primary_book_id');
    }
    public function ad_type()
    {
        return $this->belongsTo(AdType::class, 'ad_type_id');
    }
    

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['udacs.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['udacs.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'primary_book':
                    $filter_array[] = ['primary_books.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'ad_type':
                    $filter_array[] = ['ad_types.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['udacs.id', '=', $filter];
                    break;
            }
        }
        return $filter_array;
    }


    public static function orderField($sort_name)
    {
        switch ($sort_name) {
            case 'udacs.primary_book':
            return 'primary_books.name';
            break;
            case 'udacs.ad_type':
            return 'ad_types.name';
            break;
            default:
            return $sort_name;
        }
    }
}
