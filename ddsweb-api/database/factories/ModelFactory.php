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
    'category_id' => $category,
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
    'local_foreign_id' => $local_foreign,
    'medical_director' => $faker->word,
    'medical_education' => $faker->word,
    'name' => $faker->company,
    'other_1' => $faker->sentence,
    'other_2' => $faker->sentence,
    'outreach_locations' => $faker->word,
    'pay_plan_id' => $pay_plan,
    'phone' => (string)$faker->randomNumber(7),
    'primary_book_id' => $primary_book,
    'residency' => $faker->word,
    'room_num' => $faker->word,
    'sales_rep_id' => $sales_rep,
    'special_interest' => $faker->word,
    'state' => $faker->word,
    'undergraduate_education' => $faker->word,
    'website' => $faker->word,
    'zip' => $faker->postcode,
    
    ];
});

$factory->define(App\CompensationPlan::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word,
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
    'name' => $faker->word,
    'code' => $faker->word,
    ];
});

$factory->define(App\PageType::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word,
    ];
});

$factory->define(App\AdType::class, function ($faker) {

    $page_type = \App\PageType::all();
    if($page_type->count() < 2) {
        $page_type = factory(App\PageType::class)->create()->id;
    } else {
        $page_type = $page_type->random()->id;
    }

    return [
    'name' => $faker->word,
    'code' => $faker->word,
    'page_type_id' => $page_type
    ];
});

$factory->define(App\OrderStatus::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word,
    ];
});

$factory->define(App\Heading::class, function ($faker) {
    
    $page_type = \App\PageType::all();
    if($page_type->count() < 2) {
        $page_type = factory(App\PageType::class)->create()->id;
    } else {
        $page_type = $page_type->random()->id;
    }
    
    return [
    'name' => $faker->word,
    'sort_name' => $faker->word,
    'heading_num' => $faker->randomNumber(4),
    'page_type_id' => $page_type
    ];
    
});

$factory->define(App\Udac::class, function ($faker) {
    
    $primary_book = \App\PrimaryBook::all();
    if($primary_book->count() < 10) {
        $primary_book = factory(App\PrimaryBook::class)->create()->id;
    } else {
        $primary_book = $primary_book->random()->id;
    }
    
    $ad_type = \App\AdType::all();
    if($ad_type->count() < 10) {
        $ad_type = factory(App\AdType::class)->create()->id;
    } else {
        $ad_type = $ad_type->random()->id;
    }
    
    return [
    'name' => $faker->word,
    'code' => $faker->word,
    'rate' => $faker->randomNumber(5)/100,
    'primary_book_id' => $primary_book,
    'ad_type_id' => $ad_type
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
    'email' => $faker->email,
    'address' => $faker->streetAddress,
    'city' => $faker->city,
    'state' => $faker->word,
    'zip' => $faker->postcode,
    'phone' => $faker->phoneNumber,
    'email' => $faker->email,
    'is_rep' => 1,
    'is_admin' => 1,
    'is_active' => 1,
    'compensation_plan_id' => $compensation_plan,
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

$factory->define(App\Order::class, function ($faker) {
    
    $primary_book = \App\PrimaryBook::all();
    if($primary_book->count() < 10) {
        $primary_book = factory(App\PrimaryBook::class)->create()->id;
    } else {
        $primary_book = $primary_book->random()->id;
    }
    
    $customer = \App\Customer::all();
    if($customer->count() < 10) {
        $customer = factory(App\Customer::class)->create()->id;
    } else {
        $customer = $customer->random()->id;
    }
    
    $sales_rep = \App\SalesRep::all();
    if($sales_rep->count() < 10) {
        $sales_rep = factory(App\SalesRep::class)->create()->id;
    } else {
        $sales_rep = $sales_rep->random()->id;
    }
    
    
    $order_status = \App\OrderStatus::all();
    if($order_status->count() < 10) {
        $order_status = factory(App\OrderStatus::class)->create()->id;
    } else {
        $order_status = $order_status->random()->id;
    }
    
    return [
    'order_num' => (string)$faker->randomNumber(6),
    'order_date' => $faker->date,
    'primary_book_id' => $primary_book,
    'customer_id' => $customer,
    'sales_rep_id' => $sales_rep,
    'order_status_id' => $order_status
    
    ];
});

$factory->define(App\OrderLine::class, function ($faker) {
    
    $order = \App\Order::all();
    if($order->count() < 10) {
        $order = factory(App\Order::class)->create()->id;
    } else {
        $order = $order->random()->id;
    }
    
    $udac = \App\Udac::all();
    if($udac->count() < 10) {
        $udac = factory(App\Udac::class)->create()->id;
    } else {
        $udac = $udac->random()->id;
    }
    
    return [
    'order_id' => $order,
    'udac_id' => $udac,
    ];
});

$factory->define(App\FindingLine::class, function ($faker) {
    return [
    'name' => $faker->word,
    'code' => $faker->word
    ];
});

$factory->define(App\Field::class, function ($faker) {
    return [
    'name' => $faker->word,
    'description' => $faker->word
    ];
});