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
$app->post('customer_reference', 'CustomersController@referenceList');
$app->post('customer', 'CustomersController@customerByID');
$app->post('new_customer', 'CustomersController@newCustomer');
$app->post('edit_customer', 'CustomersController@editCustomer');
$app->post('delete_customer', 'CustomersController@deleteCustomer');

$app->post('sales_reps', 'SalesRepsController@salesReps');
$app->post('sales_rep_reference', 'SalesRepsController@referenceList');
$app->post('sales_rep', 'SalesRepsController@salesRepByID');
$app->post('new_sales_rep', 'SalesRepsController@newSalesRep');
$app->post('edit_sales_rep', 'SalesRepsController@editSalesRep');
$app->post('delete_sales_rep', 'SalesRepsController@deleteSalesRep');

$app->post('categories', 'CategoriesController@categories');
$app->post('category_reference', 'CategoriesController@referenceList');
$app->post('category', 'CategoriesController@categoryByID');
$app->post('new_category', 'CategoriesController@newCategory');
$app->post('edit_category', 'CategoriesController@editCategory');
$app->post('delete_category', 'CategoriesController@deleteCategory');

$app->post('pay_plans', 'PayPlansController@payPlans');
$app->post('pay_plan_reference', 'PayPlansController@referenceList');
$app->post('pay_plan', 'PayPlansController@payPlanByID');
$app->post('new_pay_plan', 'PayPlansController@newPayPlan');
$app->post('edit_pay_plan', 'PayPlansController@editPayPlan');
$app->post('delete_pay_plan', 'PayPlansController@deletePayPlan');

$app->post('local_foreigns', 'LocalForeignsController@localForeigns');
$app->post('local_foreign_reference', 'LocalForeignsController@referenceList');
$app->post('local_foreign', 'LocalForeignsController@localForeignByID');
$app->post('new_local_foreign', 'LocalForeignsController@newLocalForeign');
$app->post('edit_local_foreign', 'LocalForeignsController@editLocalForeign');
$app->post('delete_local_foreign', 'LocalForeignsController@deleteLocalForeign');

$app->post('source_books', 'SourceBooksController@sourceBooks');
$app->post('source_book_reference', 'SourceBooksController@referenceList');
$app->post('source_book', 'SourceBooksController@sourceBookByID');
$app->post('new_source_book', 'SourceBooksController@newSourceBook');
$app->post('edit_source_book', 'SourceBooksController@editSourceBook');
$app->post('delete_source_book', 'SourceBooksController@deleteSourceBook');

$app->post('primary_books', 'PrimaryBooksController@primaryBooks');
$app->post('primary_book_reference', 'PrimaryBooksController@referenceList');
$app->post('primary_book', 'PrimaryBooksController@primaryBookByID');
$app->post('new_primary_book', 'PrimaryBooksController@newPrimaryBook');
$app->post('edit_primary_book', 'PrimaryBooksController@editPrimaryBook');
$app->post('delete_primary_book', 'PrimaryBooksController@deletePrimaryBook');

$app->post('page_types', 'PageTypesController@pageTypes');
$app->post('page_type_reference', 'PageTypesController@referenceList');
$app->post('page_type', 'PageTypesController@pageTypeByID');
$app->post('new_page_type', 'PageTypesController@newPageType');
$app->post('edit_page_type', 'PageTypesController@editPageType');
$app->post('delete_page_type', 'PageTypesController@deletePageType');

$app->post('headings', 'HeadingsController@Headings');
$app->post('heading_reference', 'HeadingsController@referenceList');
$app->post('heading', 'HeadingsController@HeadingByID');
$app->post('new_heading', 'HeadingsController@newHeading');
$app->post('edit_heading', 'HeadingsController@editHeading');
$app->post('delete_heading', 'HeadingsController@deleteHeading');

$app->post('order_statuses', 'OrderStatusesController@OrderStatuses');
$app->post('order_status_reference', 'OrderStatusesController@referenceList');
$app->post('order_status', 'OrderStatusesController@OrderStatusByID');
$app->post('new_order_status', 'OrderStatusesController@newOrderStatus');
$app->post('edit_order_status', 'OrderStatusesController@editOrderStatus');
$app->post('delete_order_status', 'OrderStatusesController@deleteOrderStatus');
