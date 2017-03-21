<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
    'name' => $faker->name,
    'email' => $faker->email,
    ];
});

$factory->define(App\Customer::class, function ($faker) {
    
    $category = \App\Category::all();
    if($category->count() < 10) {
        $category = factory(App\Category::class)->create()->id;
    } else {
        $category = $category->random()->id;
    }
    
    $local_foreign = \App\LocalForeign::all();
    if($local_foreign->count() < 10) {
        $local_foreign = factory(App\LocalForeign::class)->create()->id;
    } else {
        $local_foreign = $local_foreign->random()->id;
    }
    
    $pay_plan = \App\PayPlan::all();
    if($pay_plan->count() < 10) {
        $pay_plan = factory(App\PayPlan::class)->create()->id;
    } else {
        $pay_plan = $pay_plan->random()->id;
    }
    
    $primary_book = \App\PrimaryBook::all();
    if($primary_book->count() < 10) {
        $primary_book = factory(App\PrimaryBook::class)->create()->id;
    } else {
        $primary_book = $primary_book->random()->id;
    }
    
    $sales_rep = \App\SalesRep::all();
    if($sales_rep->count() < 10) {
        $sales_rep = factory(App\SalesRep::class)->create()->id;
    } else {
        $sales_rep = $sales_rep->random()->id;
    }
    
    return [
    'account_num' => (string)$faker->randomNumber(6),
    'address' => $faker->streetAddress,
    'advanced_training' => $faker->word,
    'affiliated_clinics' => $faker->word,
    'affiliated_networks' => $faker->word,
    'area' => (string)$faker->randomNumber(3),
    'billing_address' => $faker->streetAddress,
    'billing_area' => (string)$faker->randomNumber(3),
    'billing_city' => $faker->city,
    'billing_contact' => $faker->name,
    'billing_email' => $faker->email,
    'billing_name' => $faker->company,
    'billing_phone' => (string)$faker->randomNumber(7),
    'billing_state' => $faker->word,
    'billing_zip' => $faker->postcode,
    'building' => $faker->word,
    'category' => $category,
    'certification' => $faker->word,
    'city' => $faker->city,
    'department' => $faker->word,
    'director' => $faker->word,
    'email' => $faker->email,
    'entered_public_practice' => $faker->word,
    'fax_area' => (string)$faker->randomNumber(3),
    'fax_phone' => (string)$faker->randomNumber(7),
    'fellowship' => $faker->word,
    'hospital_affiliations' => $faker->word,
    'hours' => $faker->word,
    'local_foreign' => $local_foreign,
    'medical_director' => $faker->word,
    'medical_education' => $faker->word,
    'name' => $faker->company,
    'other_1' => $faker->sentence,
    'other_2' => $faker->sentence,
    'outreach_locations' => $faker->word,
    'pay_plan' => $pay_plan,
    'phone' => (string)$faker->randomNumber(7),
    'primary_book' => $primary_book,
    'residency' => $faker->word,
    'room_num' => $faker->word,
    'sales_rep' => $sales_rep,
    'special_interest' => $faker->word,
    'state' => $faker->word,
    'undergraduate_education' => $faker->word,
    'website' => $faker->word,
    'zip' => $faker->postcode,
    
    ];
});


$factory->define(App\CompensationPlan::class, function ($faker) {
    return [
    'name' => $faker->word
    ];
});

$factory->define(App\Category::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word
    ];
});

$factory->define(App\LocalForeign::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word
    ];
});

$factory->define(App\PayPlan::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word,
    ];
});

$factory->define(App\PrimaryBook::class, function ($faker) {
    return [
    'name' => $faker->word
    ];
});

$factory->define(App\SalesRep::class, function (Faker\Generator $faker) {
    
    $compensation_plan = \App\CompensationPlan::all();
    if($compensation_plan->count() < 5) {
        $compensation_plan = factory(App\CompensationPlan::class)->create()->id;
    } else {
        $compensation_plan = $compensation_plan->random()->id;
    }
    
    return [
    'name' => $faker->name,
    'code' => $faker->word,
    'address' => $faker->streetAddress,
    'city' => $faker->city,
    'state' => $faker->word,
    'zip' => $faker->postcode,
    'phone' => $faker->phoneNumber,
    'email' => $faker->email,
    'compensation_plan' => $compensation_plan,
    'commission_new' => $faker->randomNumber(2),
    'commission_renew' => $faker->randomNumber(2)
    ];
});

$factory->define(App\SourceBook::class, function ($faker) {
    return [
    'code' => $faker->word,
    'name' => $faker->word,
    'yppa_num'=> $faker->word,
    'pub_month' => $faker->date,
    'sales_start' => $faker->date,
    'sales_close' => $faker->date
    ];
});

$factory->define(App\PrimaryBook::class, function ($faker) {
    return [
    'code' => $faker->word,
    'name' => $faker->word,
    'yppa_num'=> $faker->word,
    'pub_month' => $faker->date,
    'sales_start' => $faker->date,
    'sales_close' => $faker->date
    ];
});