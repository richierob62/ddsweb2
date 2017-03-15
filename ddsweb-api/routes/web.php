<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return response()->json([
        'version' => $app->version(),
        'hey' => 'there'
    ]);
});

$app->post('customers', 'CustomersController@customers');
$app->post('customer', 'CustomersController@customerByID');
$app->post('new_customer', 'CustomersController@newCustomer');
$app->post('edit_customer', 'CustomersController@editCustomer');
$app->post('delete_customer', 'CustomersController@deleteCustomer');
