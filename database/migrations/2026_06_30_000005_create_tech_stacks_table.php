<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_stacks', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->string('version')->nullable();
            $table->string('index_label')->nullable();
            $table->string('role')->nullable();
            $table->json('bullets')->nullable();
            $table->integer('position');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_stacks');
    }
};
