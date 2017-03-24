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
            
            $table->integer('primary_book')->unsigned()->index();
            $table->integer('ad_type')->unsigned()->index();
            
            $table->string('name')->index();
            $table->string('code')->index();
            
            $table->decimal('rate', 6, 2);
            
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