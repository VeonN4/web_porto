<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_settings', function (Blueprint $table) {
            $table->id();
            $table->string('header');
            $table->string('competencies_header');
            $table->text('concrete_image');
            $table->json('paragraphs');
            $table->json('competencies');
            $table->string('sys_config_location');
            $table->string('sys_config_timezone');
            $table->string('sys_config_status');
            $table->json('sys_config_languages');
            $table->json('sys_config_frameworks');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_settings');
    }
};
