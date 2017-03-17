<?php

abstract class TestCase extends Laravel\Lumen\Testing\TestCase
{
    /**
    * Creates the application.
    *
    * @return \Laravel\Lumen\Application
    */
    public function createApplication()
    {
        return require __DIR__.'/../bootstrap/app.php';
    }
    
    protected function customerFactory($count = 1)
    {
        $category = factory(App\Category::class)->create();
        $pay_plan = factory(App\PayPlan::class)->create();
        $primary_book = factory(App\PrimaryBook::class)->create();
        $sales_rep = factory(App\SalesRep::class)->create();
        $local_foreign = factory(App\LocalForeign::class)->create();
        
        $customers = factory(\App\Customer::class, $count)->make();
        
        if ($count === 1) {
            $customer = $customers->first();
            $customer->category = $category->id;
            $customer->pay_plan = $pay_plan->id;
            $customer->primary_book = $primary_book->id;
            $customer->sales_rep = $sales_rep->id;
            $customer->local_foreign = $local_foreign->id;
            $customer->save();
            return $customer;
        } else {
            foreach ($customers as $customer) {
                $customer->category = $category->id;
                $customer->pay_plan = $pay_plan->id;
                $customer->primary_book = $primary_book->id;
                $customer->sales_rep = $sales_rep->id;
                $customer->local_foreign = $local_foreign->id;
                $customer->save();
            }
            return $customers;
        }
        
    }
}