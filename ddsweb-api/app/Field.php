<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $guarded = [];

    public static function rules($id = null)
    {
        return [
            'name' => 'required|unique:fields,name,' . $id,
            'description' => 'required|unique:fields,description,' . $id,
            'input_type' => 'required|in:text,select,typeahead',
        ];
    }

    public static function errorMessages()
    {
        return [
            'name.unique' => 'That field name has already been used.',
            'name.required' => 'A field name is required.',
            'description.unique' => 'That field description has already been used.',
            'description.required' => 'A field description is required.',
            'input_type.required' => 'An input type is required.',
            'input_type.in' => 'The input type must be text, select or typeahead',
        ];
    }

    public function okToDelete()
    {
        return $this->ad_types()->count() == 0;
    }

    public function ad_types()
    {
        return $this->belongsToMany(AdType::class, 'ad_type_field')
            ->withPivot('sequence')
            ->withTimestamps();
    }

    public function order_lines()
    {
        return $this->belongsToMany(OrderLine::class, 'field_order_line')
            ->withPivot(['value'])
            ->withTimestamps();
    }

    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['fields.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'description':
                    $filter_array[] = ['fields.description', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'input_type':
                    $filter_array[] = ['fields.input_type', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'ref_table':
                    $filter_array[] = ['fields.ref_table', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'filter_fld':
                    $filter_array[] = ['fields.filter_fld', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'filter_val':
                    $filter_array[] = ['fields.filter_val', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['fields.id', '=', $filter];
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
