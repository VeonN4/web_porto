<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSettings extends Model
{
    protected $fillable = [
        'header',
        'competencies_header',
        'concrete_image',
        'paragraphs',
        'competencies',
        'sys_config_location',
        'sys_config_timezone',
        'sys_config_status',
        'sys_config_languages',
        'sys_config_frameworks',
    ];

    protected function casts(): array
    {
        return [
            'paragraphs' => 'array',
            'competencies' => 'array',
            'sys_config_languages' => 'array',
            'sys_config_frameworks' => 'array',
        ];
    }
}
