<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Udac extends Model
{
    protected $guarded = [];
    
    static public function rules($id = null) {
        return [
        'name' => 'required|unique:udacs,name,'.$id,
        'code' => 'required|unique:udacs,code,'.$id,
        'primary_book_id'  => 'required|exists:primary_books,id',
        'ad_type_id'  => 'required|exists:ad_types,id'
        ];
    }
    static public function errorMessages() {
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
    
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book_id');  }
    public function ad_type() { return $this->belongsTo(AdType::class, 'ad_type_id');  }
    
    static public function scopeFilterOn($query, $key, $filter)
    {
        switch ($key) {
            case 'name':
                $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'primary_book':
                $query->whereHas('primary_book', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'ad_type':
                $query->whereHas('ad_type', function($q) use ($filter) {
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
            case 'primary_book':
            return 'primary_books.name';
            break;
            case 'ad_type':
            return 'ad_types.name';
            break;
            default:
            return $sort_name;
        }  
    }

}