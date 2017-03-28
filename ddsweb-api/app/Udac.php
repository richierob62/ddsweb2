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
        'primary_book'  => 'exists:primary_books,id',
        'ad_type'  => 'exists:ad_types,id'
        ];
    }
    static public function errorMessages() {
        return [
            
        'name.unique' => 'That udac name has already been used.',
        'code.unique' => 'That udac code has already been used.',
        
        'name.required' => 'A udac name is required.',
        'code.required' => 'A udac code is required.',
        
        'primary_book.exists' => 'You must select a valid primary book.',
        'ad_type.exists' => 'You must select a valid ad type.'
        
        ];
    }
    
    public function primary_book() { return $this->belongsTo(PrimaryBook::class, 'primary_book');  }
    public function ad_type() { return $this->belongsTo(AdType::class, 'ad_type');  }
    
    static public function filterOn($key, $filter, $query)
    {
        switch ($key) {
            case 'name':
                return $query->where('name', 'LIKE', '%'.$filter.'%');
                break;
            case 'code':
                return $query->where('code', 'LIKE', '%'.$filter.'%');
                break;
            case 'primary_book':
                return $query->whereHas('primary_book', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'ad_type':
                return $query->whereHas('ad_type', function($q) use ($filter) {
                    $q->where('name', 'LIKE', '%'.$filter.'%');
                });
                break;
            case 'id':
                return $query->where('id', $filter);
                break;
            default:
                return $query;
        }
    }

    static public function sortResultsBy($code, $sort_dir, $query) {
        switch ($code) {
            case 'primary_book':
                return $query->whereHas('primary_book', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            case 'ad_type':
                return $query->whereHas('ad_type', function($q) use ($filter, $sort_dir) {
                    $q->orderBy('name', $sort_dir);
                });
                break;
            default:
                return $query->orderBy($code, $sort_dir);
        }        
    }
}