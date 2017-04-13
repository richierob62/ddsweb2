<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFieldOrderLineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('field_order_line', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('field_id')->index();
            $table->unsignedInteger('order_line_id')->index();
            $table->unsignedInteger('is_reference')->default(0);
            $table->string('reference_table')->nullable();
            $table->string('value')->nullable();
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
        Schema::dropIfExists('field_order_line');
    }
}
