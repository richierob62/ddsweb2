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

            $table->string('password');
            $table->string('token')->nullable();            
            
            $table->integer('compensation_plan_id')->unsigned()->index();
            
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->string('is_rep')->default('Y');
            $table->string('is_admin')->default('N');
            $table->string('is_active')->default('Y');
            
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