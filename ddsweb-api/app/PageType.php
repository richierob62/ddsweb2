<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PageType extends Model
{
    protected $guarded = [];
    
    public static function rules($id = null)
    {
        return [
        'name' => 'required|unique:page_types,name,'.$id,
        'code' => 'required|unique:page_types,code,'.$id
        ];
    }
    
    public static function errorMessages()
    {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A page type name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A page type code is required.'
        ];
    }

    public function okToDelete()
    {
        return ($this->ad_types()->count() == 0) && ($this->headings()->count() == 0);
    }
    public function ad_types()
    {
        return $this->hasMany(AdType::class);
    }

    public function headings()
    {
        return $this->hasMany(Heading::class);
    }
    
    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['page_types.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['page_types.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['page_types.id', '=', $filter];
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
