<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdTypeFieldTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ad_type_field', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ad_type_id')->unsigned()->index();
            $table->integer('field_id')->unsigned()->index();
            $table->integer('sequence')->unsigned();
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
        Schema::dropIfExists('ad_type_field');
    }
}
