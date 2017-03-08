<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            
            $table->increments('id');
            
            $table->integer('category')->unsigned()->index();
            $table->integer('local_foreign')->unsigned()->index();
            $table->integer('pay_plan')->unsigned()->index();
            $table->integer('primary_book')->unsigned()->index();
            $table->integer('sales_rep')->unsigned()->index();
            
            $table->string('account_num')->index();
            $table->string('address')->index();
            $table->string('advanced_training');
            $table->string('affiliated_clinics');
            $table->string('affiliated_networks');
            $table->string('area');
            $table->string('billing_address');
            $table->string('billing_area');
            $table->string('billing_city');
            $table->string('billing_contact');
            $table->string('billing_email');
            $table->string('billing_name');
            $table->string('billing_phone');
            $table->string('billing_state');
            $table->string('billing_zip');
            $table->string('building');
            $table->string('certification');
            $table->string('city')->index();
            $table->string('department');
            $table->string('director');
            $table->string('email');
            $table->string('entered_public_practice');
            $table->string('fax_area');
            $table->string('fax_phone');
            $table->string('fellowship');
            $table->string('hospital_affiliations');
            $table->string('hours');
            $table->string('medical_director');
            $table->string('medical_education');
            $table->string('name')->index();
            $table->string('other_1');
            $table->string('other_2');
            $table->string('outreach_locations');
            $table->string('phone');
            $table->string('residency');
            $table->string('room_num');
            $table->string('special_interest');
            $table->string('state')->index();
            $table->string('undergraduate_education');
            $table->string('website');
            $table->string('zip');
            
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
        Schema::dropIfExists('customers');
    }
}