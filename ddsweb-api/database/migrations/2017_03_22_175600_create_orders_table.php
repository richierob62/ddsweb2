<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {

            $table->increments('id');

            $table->string('order_num')->index();
            $table->date('order_date')->index();

            $table->integer('primary_book')->unsigned()->index();
            $table->integer('customer')->unsigned()->index();
            $table->integer('sales_rep')->unsigned()->index();
            $table->integer('order_status')->unsigned()->index();
            
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
        Schema::dropIfExists('orders');
    }
}
