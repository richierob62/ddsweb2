<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FindingLine extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:finding_lines,name,'.$id,
        'code' => 'required|unique:finding_lines,code,'.$id
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'A finding line name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'A finding line code is required.'
        ];
    }
    
    public function okToDelete() {

        $fl_fields = Field::where('ref_table', 'finding_lines')
        ->get(['id'])
        ->toArray();

        $uses = OrderLine::select(\DB::raw('order_lines.id'))
        ->join('field_order_line', 'order_lines.id', '=', 'field_order_line.order_line_id')
        ->whereIn('field_order_line.field_id', $fl_fields )
        ->where('value', $this->id)
        ->count();

        return $uses == 0;
        
    }


    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'id':
                $query->where('id', $filter);
                break;
            default:
                $query;
        }
    }
    
    static public function orderField($sort_name) {
        switch ($sort_name) {
            case 'foo':
            return 'huh';
            break;
            default:
            return $sort_name;
        }  
    }
    
}