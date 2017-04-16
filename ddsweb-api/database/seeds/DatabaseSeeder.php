<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        Model::unguard();
        // $this->call('UsersTableSeeder');
        factory('App\PageType', 2)->create();
        factory('App\OrderStatus', 5)->create();
        factory('App\Category', 10)->create();
        factory('App\CompensationPlan', 5)->create();
        factory('App\Field', 30)->create();
        factory('App\FindingLine', 30)->create();
        factory('App\Heading', 200)->create();
        factory('App\LocalForeign', 5)->create();
        factory('App\AdType', 30)->create();
        factory('App\PayPlan', 10)->create();
        factory('App\PrimaryBook', 50)->create();
        factory('App\SalesRep', 20)->create();
        factory('App\SourceBook', 250)->create();
        factory('App\Udac', 250)->create();
        factory('App\Customer', 500)->create();
        factory('App\Order', 500)->create();
        factory('App\OrderLine', 2000)->create();
        Model::reguard();
    }
}