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
        factory('App\Category', 10)->create();
        factory('App\LocalForeign', 5)->create();
        factory('App\PayPlan', 10)->create();
        factory('App\PrimaryBook', 25)->create();
        factory('App\CompensationPlan', 5)->create();
        factory('App\SalesRep', 10)->create();
        factory('App\SourceBook', 25)->create();
        factory('App\Customer', 500)->create();
        Model::reguard();
    }
}