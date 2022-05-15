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
        Schema::table('questions', function (Blueprint $table) {
            $table->string('question')->nullable()->default('')->change();
            $table->string('top_desc_href')->after('description')->nullable()->default('');
            $table->string('bottom_description')->after('top_desc_href')->nullable()->default('');
            $table->string('bottom_desc_href')->after('bottom_description')->nullable()->default('');
            $table->string('user_prop')->after('input_placeholder')->nullable()->default('');
            $table->renameColumn('description', 'top_description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            //
        });
    }
};
