<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdType extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:ad_types,name,'.$id,
        'code' => 'required|unique:ad_types,code,'.$id,
        'page_type_id'  => 'required|exists:page_types,id',
        ];
    }
    
    static public function errorMessages() {
        return [
        'name.unique' => 'That name has already been used.',
        'name.required' => 'An ad type name is required.',
        'code.unique' => 'That code has already been used.',
        'code.required' => 'An ad type code is required.',
        
        'page_type_id.exists' => 'You must select a valid page type.',
        'page_type_id.required' => 'You must select a valid page type.',
        
        ];
    }

    public function okToDelete() {
        return $this->udacs()->count() == 0;
    }
    
    public function page_type() { return $this->belongsTo(PageType::class, 'page_type_id');  }
    public function fields() {
        return $this->belongsToMany(Field::class, 'ad_type_field')
                    ->withPivot('sequence')
                    ->withTimestamps();  
    }
    public function udacs() { return $this->hasMany(Udac::class); }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'page_type':
                $query->whereHas('page_type', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
            });
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
            case 'page_type':
                return 'page_types.name';
                break;
            default:
                return $sort_name;
        }
    }

}