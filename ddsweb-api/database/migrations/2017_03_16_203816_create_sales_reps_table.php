<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesRepsTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        Schema::create('sales_reps', function (Blueprint $table) {
            
            $table->increments('id');
            
            $table->string('code')->index();
            $table->string('name')->index();
            
            $table->integer('compensation_plan')->unsigned()->index();
            
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->boolean('is_rep')->default(1);
            $table->boolean('is_admin')->default(0);
            $table->boolean('is_active')->default(1);
            
            $table->float('commission_new')->nullable();
            $table->float('commission_renew')->nullable();

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
        Schema::dropIfExists('sales_reps');
    }
}