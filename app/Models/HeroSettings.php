<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSettings extends Model
{
    protected $fillable = [
        'headline',
        'subheadline',
        'tagline',
        'description',
        'status',
        'core_stack',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'array',
            'core_stack' => 'array',
        ];
    }
}
