<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'slug',
        'role',
        'company',
        'period',
        'bullets',
        'technologies',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
            'technologies' => 'array',
        ];
    }
}
