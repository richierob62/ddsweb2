<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FindingLine extends Model
{
    protected $guarded = [];
    
    public static function rules($id = null)
    {
        return [
        'name' => 'required|unique:finding_lines,name,'.$id,
        'code' => 'required|unique:finding_lines,code,'.$id
        ];
    }
    
    public static function errorMessages()
    {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A finding line name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A finding line code is required.'
        ];
    }
    
    public function okToDelete()
    {
        $fl_finding_lines = Field::where('ref_table', 'finding_lines')
        ->get(['id'])
        ->toArray();

        $uses = OrderLine::select(\DB::raw('order_lines.id'))
        ->join('field_order_line', 'order_lines.id', '=', 'field_order_line.order_line_id')
        ->whereIn('field_order_line.field_id', $fl_finding_lines)
        ->where('value', $this->id)
        ->count();

        return $uses == 0;
    }


    public static function buildFilter($filters)
    {
        $filter_array = [];
        foreach ($filters as $key => $filter) {
            switch ($key) {
                case 'name':
                    $filter_array[] = ['finding_lines.name', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'code':
                    $filter_array[] = ['finding_lines.code', 'LIKE', '%' . $filter . '%'];
                    break;
                case 'id':
                    $filter_array[] = ['finding_lines.id', '=', $filter];
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
