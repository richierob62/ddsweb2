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
        'category' => 1,
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
        'local_foreign' => 1,
        'medical_director' => $faker->word,
        'medical_education' => $faker->word,
        'name' => $faker->company,
        'other_1' => $faker->sentence,
        'other_2' => $faker->sentence,
        'outreach_locations' => $faker->word,
        'pay_plan' => 1,
        'phone' => (string)$faker->randomNumber(7),
        'primary_book' => 1,
        'residency' => $faker->word,
        'room_num' => $faker->word,
        'sales_rep' => 1,
        'special_interest' => $faker->word,
        'state' => $faker->word,
        'undergraduate_education' => $faker->word,
        'website' => $faker->word,
        'zip' => $faker->postcode,

    ];
});


