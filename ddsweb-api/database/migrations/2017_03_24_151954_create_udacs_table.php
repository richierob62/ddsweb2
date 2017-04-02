<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUdacsTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        Schema::create('udacs', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('primary_book_id')->unsigned()->index();
            $table->integer('ad_type_id')->unsigned()->index();
            
            $table->string('name')->index();
            $table->string('code')->index();
            
            $table->integer('rate');
            
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
        Schema::dropIfExists('udacs');
    }
}