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

// $app->get('/', function () use ($app) {
//     return response()->json([
//         'version' => $app->version(),
//         'hey' => 'there'
//     ]);
// });

$app->group(['middleware' => 'auth'], function () use ($app) {
    
    $app->post('customers', 'CustomersController@customers');
    $app->post('customer_reference', 'CustomersController@referenceList');
    $app->post('customer', 'CustomersController@customerByID');
    $app->post('new_customer', 'CustomersController@newCustomer');
    $app->post('edit_customer', 'CustomersController@editCustomer');
    $app->post('delete_customer', 'CustomersController@deleteCustomer');
    $app->post('next_customer_number', 'CustomersController@nextCustomerNumber');
    
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
    
    $app->post('compensation_plans', 'CompensationPlansController@compensationPlans');
    $app->post('compensation_plan_reference', 'CompensationPlansController@referenceList');
    $app->post('compensation_plan', 'CompensationPlansController@compensationPlanByID');
    $app->post('new_compensation_plan', 'CompensationPlansController@newCompensationPlan');
    $app->post('edit_compensation_plan', 'CompensationPlansController@editCompensationPlan');
    $app->post('delete_compensation_plan', 'CompensationPlansController@deleteCompensationPlan');
    
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
    $app->post('get_source_books', 'PrimaryBooksController@getSourceBooks');
    $app->post('attach_source_book', 'PrimaryBooksController@attachSourceBook');
    $app->post('remove_source_book', 'PrimaryBooksController@removeSourceBook');
    
    $app->post('page_types', 'PageTypesController@pageTypes');
    $app->post('page_type_reference', 'PageTypesController@referenceList');
    $app->post('page_type', 'PageTypesController@pageTypeByID');
    $app->post('new_page_type', 'PageTypesController@newPageType');
    $app->post('edit_page_type', 'PageTypesController@editPageType');
    $app->post('delete_page_type', 'PageTypesController@deletePageType');
    
    $app->post('headings', 'HeadingsController@headings');
    $app->post('heading_reference', 'HeadingsController@referenceList');
    $app->post('heading', 'HeadingsController@headingByID');
    $app->post('new_heading', 'HeadingsController@newHeading');
    $app->post('edit_heading', 'HeadingsController@editHeading');
    $app->post('delete_heading', 'HeadingsController@deleteHeading');
    
    $app->post('order_statuses', 'OrderStatusesController@orderStatuses');
    $app->post('order_status_reference', 'OrderStatusesController@referenceList');
    $app->post('order_status', 'OrderStatusesController@orderStatusByID');
    $app->post('new_order_status', 'OrderStatusesController@newOrderStatus');
    $app->post('edit_order_status', 'OrderStatusesController@editOrderStatus');
    $app->post('delete_order_status', 'OrderStatusesController@deleteOrderStatus');
    
    $app->post('orders', 'OrdersController@orders');
    $app->post('order_reference', 'OrdersController@referenceList');
    $app->post('order', 'OrdersController@orderByID');
    $app->post('new_order', 'OrdersController@newOrder');
    $app->post('edit_order', 'OrdersController@editOrder');
    $app->post('delete_order', 'OrdersController@deleteOrder');
    $app->post('next_order_number', 'OrdersController@nextOrderNumber');
    
    $app->post('ad_types', 'AdTypesController@adTypes');
    $app->post('ad_type_reference', 'AdTypesController@referenceList');
    $app->post('ad_type', 'AdTypesController@adTypeByID');
    $app->post('new_ad_type', 'AdTypesController@newAdType');
    $app->post('edit_ad_type', 'AdTypesController@editAdType');
    $app->post('delete_ad_type', 'AdTypesController@deleteAdType');
    $app->post('get_fields', 'AdTypesController@getFields');
    $app->post('attach_field', 'AdTypesController@addField');
    $app->post('remove_field', 'AdTypesController@deleteField');
    $app->post('promote_field', 'AdTypesController@promoteField');
    $app->post('demote_field', 'AdTypesController@demoteField');
    
    $app->post('udacs', 'UdacsController@udacs');
    $app->post('udac_reference', 'UdacsController@referenceList');
    $app->post('udac', 'UdacsController@udacByID');
    $app->post('new_udac', 'UdacsController@newUdac');
    $app->post('edit_udac', 'UdacsController@editUdac');
    $app->post('delete_udac', 'UdacsController@deleteUdac');
    
    $app->post('new_order_line', 'OrderLinesController@newOrderLine');
    $app->post('order_lines', 'OrderLinesController@orderLines');
    $app->post('order_line', 'OrderLinesController@orderLineByID');
    $app->post('edit_order_line', 'OrderLinesController@editOrderLine');
    $app->post('delete_order_line', 'OrderLinesController@deleteOrderLine');
    
    $app->post('get_udac_data', 'OrderLinesController@getUdacData');
    $app->post('edit_udac_data', 'OrderLinesController@editUdacData');
    $app->post('promote_order_line', 'OrderLinesController@promoteOrderLine');
    $app->post('demote_order_line', 'OrderLinesController@demoteOrderLine');
    
    $app->post('finding_lines', 'FindingLinesController@findingLines');
    $app->post('finding_line_reference', 'FindingLinesController@referenceList');
    $app->post('finding_line', 'FindingLinesController@findingLineByID');
    $app->post('new_finding_line', 'FindingLinesController@newFindingLine');
    $app->post('edit_finding_line', 'FindingLinesController@editFindingLine');
    $app->post('delete_finding_line', 'FindingLinesController@deleteFindingLine');
    
    $app->post('fields', 'FieldsController@fields');
    $app->post('field_reference', 'FieldsController@referenceList');
    $app->post('field', 'FieldsController@fieldByID');
    $app->post('new_field', 'FieldsController@newField');
    $app->post('edit_field', 'FieldsController@editField');
    $app->post('delete_field', 'FieldsController@deleteField');
    
});