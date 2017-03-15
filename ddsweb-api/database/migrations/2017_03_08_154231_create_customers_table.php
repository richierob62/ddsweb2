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
            
            $table->string('name')->index();

            $table->string('account_num')->index()->nullable();
            $table->string('address')->index()->nullable();
            $table->string('advanced_training')->nullable();
            $table->string('affiliated_clinics')->nullable();
            $table->string('affiliated_networks')->nullable();
            $table->string('area')->nullable();
            $table->string('billing_address')->nullable();
            $table->string('billing_area')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_contact')->nullable();
            $table->string('billing_email')->nullable();
            $table->string('billing_name')->nullable();
            $table->string('billing_phone')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_zip')->nullable();
            $table->string('building')->nullable();
            $table->string('certification')->nullable();
            $table->string('city')->index()->nullable();
            $table->string('department')->nullable();
            $table->string('director')->nullable();
            $table->string('email')->nullable();
            $table->string('entered_public_practice')->nullable();
            $table->string('fax_area')->nullable();
            $table->string('fax_phone')->nullable();
            $table->string('fellowship')->nullable();
            $table->string('hospital_affiliations')->nullable();
            $table->string('hours')->nullable();
            $table->string('medical_director')->nullable();
            $table->string('medical_education')->nullable();
            $table->string('other_1')->nullable();
            $table->string('other_2')->nullable();
            $table->string('outreach_locations')->nullable();
            $table->string('phone')->nullable();
            $table->string('residency')->nullable();
            $table->string('room_num')->nullable();
            $table->string('special_interest')->nullable();
            $table->string('state')->index()->nullable();
            $table->string('undergraduate_education')->nullable();
            $table->string('website')->nullable();
            $table->string('zip')->nullable();
            
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