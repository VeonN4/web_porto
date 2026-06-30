<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'image_url',
        'status',
        'github_url',
        'demo_url',
        'details',
        'tags',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }
}
