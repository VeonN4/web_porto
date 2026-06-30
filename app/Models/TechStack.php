<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechStack extends Model
{
    protected $fillable = [
        'type',
        'name',
        'icon',
        'description',
        'version',
        'index_label',
        'role',
        'bullets',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
        ];
    }
}
