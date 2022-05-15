<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('question');
            $table->string('description')->nullable()->default('');
            $table->text('detailed_desc')->nullable();
            $table->string('image_url')->nullable()->default('');
            $table->string('button')->nullable()->default('');
            $table->string('button_action')->nullable()->default('');
            $table->integer('phase');
            $table->integer('order');
            $table->json('choices')->nullable();
            $table->json('skip_logic')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
};
