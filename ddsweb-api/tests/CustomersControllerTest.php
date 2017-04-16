<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class CustomersControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->category = factory(App\Category::class)->create();
        $this->pay_plan = factory(App\PayPlan::class)->create();
        $this->primary_book = factory(App\PrimaryBook::class)->create();
        $this->sales_rep = factory(App\SalesRep::class)->create();
        $this->local_foreign = factory(App\LocalForeign::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\Customer::class, 3)->create();
        $this
        ->post('/customers')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\Customer::class, 3)->create();
        $this->post('/customers');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\Customer::class, 3)->create();
        $this->post('/customer_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $sales_rep_2 = factory(App\SalesRep::class)->create()->toArray();
        $sales_rep_2['name'] = '0000ing-123rep_name-something';
        $this->post('/edit_sales_rep', $sales_rep_2);
        
        factory(App\Customer::class, 6)->create();
        $customer = factory(App\Customer::class)->create()->toArray();
        $customer['name'] = '0000something-123name-something';
        $customer['address'] = '0000something-123address-something';
        $customer['city'] = 'something-123city-something';
        $customer['state'] = 'something-123state-something';
        $customer['account_num'] = 'something-123account_num-something';
        $customer['sales_rep_id'] = $sales_rep_2['id'];
        $this->post('/edit_customer', $customer);
        
        $this->post('/customers', [
        'filters' => [
        'name' => '123name',
        'address' => '123address',
        'city' => '123city',
        'state' => '123state',
        'account_num' => '123account_num',
        'sales_rep' => '123rep_name',
        'id' => $customer['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/customers', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/customers', [
        'filters' => [],
        'sort_name' => 'sales_rep',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['sales_rep_id'], $sales_rep_2['id']);
        
        $this->post('/customers');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_customer()
    {

        factory(App\Customer::class, 6)->create();
        $this->post('/customers');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        $rec_1 = $data[0];

        $custs = App\Customer::where('id', $id)->get(['id', 'name'])->toArray();

        $this
        ->post('/customer', ['id' => $id])
        ->seeStatusCode(200);
        
        $rec_2 = json_decode($this->response->getContent(), true)['data'];

        $this->assertEquals($rec_1['name'], $rec_2['name']);
        $this->assertEquals($rec_1['sales_rep_id'], $rec_2['sales_rep_id']);
        
        $this->assertArrayhasKey('created_at', $rec_2);
        $this->assertArrayhasKey('updated_at', $rec_2);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_customer_id_does_not_exist()
    {
        $this
        ->post('/customer', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_customer_in_the_database()
    {
        $new = factory(App\Customer::class)->raw();
        $name = $new['name'];
        $category_id = $new['category_id'];
        
        $this->post('/new_customer', $new);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($name, $data['name']);
        $this->assertEquals($category_id, $data['category_id']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('customers', ['name' => $name]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $customer = factory(App\Customer::class)->create();
        
        $edited = factory(App\Customer::class)->raw();
        $name = $edited['name'];
        $category_id = $edited['category_id'];
        $id = $customer->id;
        $edited['id'] = $id;
        
        $this->post('/edit_customer',$edited);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('customers', ['name' => $name ]);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $updated = factory(App\Customer::class)->raw();
        $updated['id'] = 999999;
        
        $this->post('/edit_customer', $updated);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_customer()
    {
        $customer = factory(App\Customer::class)->create();
        
        $id = $customer->id;
        
        $this->seeInDatabase('customers', ['id' => $id]);
        
        $this
        ->post('/delete_customer', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('customers', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_customer', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }


    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $customer = factory(App\Customer::class)->create();

        $order = factory(App\Order::class)->raw();
        $order['customer_id'] = $customer->id;
        $this->post('/new_order', $order);

        $this
        ->post('/delete_customer', ['id' => $customer->id])
        ->seeStatusCode(422)
        ->seeJson(['error' => 'Cannot be deleted: Orders exist']);
    }


    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_customer()
    {
        $this->post('/new_customer', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["An account number is required."], $errors['account_num']);
        $this->assertEquals(["A company name is required."], $errors['name']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_customer()
    {
        
        $customer = factory(App\Customer::class)->create();
        
        $this->post('/edit_customer', ['id' => $customer->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["An account number is required."], $errors['account_num']);
        $this->assertEquals(["A company name is required."], $errors['name']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        $new = factory(App\Customer::class)->raw();
        
        $this->post('/new_customer', $new);
        
        $this->post('/new_customer', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That account number has already been used."], $errors['account_num']);
        $this->assertEquals(["That company name has already been used."], $errors['name']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $customer_1 = factory(App\Customer::class)->create();
        
        $customer_2 = factory(App\Customer::class)->create();
        
        $this->post('/edit_customer', [
        'id' => $customer_2->id,
        'account_num' => $customer_1->account_num,
        'category_id' => $this->category->id,
        'local_foreign_id' => $this->local_foreign->id,
        'pay_plan_id' => $this->pay_plan->id,
        'primary_book_id' => $this->primary_book->id,
        'sales_rep_id' => $this->sales_rep->id,
        'name' => $customer_1->name
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That account number has already been used."], $errors['account_num']);
        $this->assertEquals(["That company name has already been used."], $errors['name']);
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        $new = factory(App\Customer::class)->raw();
        $new['email'] = 'foo';
        $new['billing_email'] = 'foo';
        
        $this->post('/new_customer', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('billing_email', $errors);
        $this->assertArrayHasKey('email', $errors);
        
        $this->assertEquals(["The billing email must be a valid email address."], $errors['billing_email']);
        $this->assertEquals(["The email must be a valid email address."], $errors['email']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        $customer = factory(App\Customer::class)->create()->toArray();
        
        $customer['billing_email'] = 'foo';
        $customer['email'] = 'foo';
        
        $this->post('/edit_customer', $customer);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('billing_email', $errors);
        $this->assertArrayHasKey('email', $errors);
        
        $this->assertEquals(["The billing email must be a valid email address."], $errors['billing_email']);
        $this->assertEquals(["The email must be a valid email address."], $errors['email']);
    }
    
    // type - create
    /** @test **/
    public function it_validates_reference_fields_on_create()
    {
        $new = factory(App\Customer::class)->raw();
        $new['category_id'] = 888888;
        $new['local_foreign_id'] = NULL;
        $new['pay_plan_id'] = 888888;
        $new['primary_book_id'] = NULL;
        $new['sales_rep_id'] = 888888;
        
        $this->post('/new_customer', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('category_id', $errors);
        $this->assertArrayHasKey('local_foreign_id', $errors);
        $this->assertArrayHasKey('pay_plan_id', $errors);
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('sales_rep_id', $errors);
        
        $this->assertEquals(["You must select a valid category."], $errors['category_id']);
        $this->assertEquals(["You must select a valid local/foreign."], $errors['local_foreign_id']);
        $this->assertEquals(["You must select a valid pay plan."], $errors['pay_plan_id']);
        $this->assertEquals(["You must select a valid primary book."], $errors['primary_book_id']);
        $this->assertEquals(["You must select a valid sales rep."], $errors['sales_rep_id']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $customer = factory(App\Customer::class)->create()->toArray();
        
        $customer['category_id'] = NULL;
        $customer['local_foreign_id'] = 9999999;
        $customer['pay_plan_id'] = 9999999;
        $customer['primary_book_id'] = 9999999;
        $customer['sales_rep_id'] = NULL;
        
        $this->post('/edit_customer', $customer);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('category_id', $errors);
        $this->assertArrayHasKey('local_foreign_id', $errors);
        $this->assertArrayHasKey('pay_plan_id', $errors);
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('sales_rep_id', $errors);
        
        $this->assertEquals(["You must select a valid category."], $errors['category_id']);
        $this->assertEquals(["You must select a valid local/foreign."], $errors['local_foreign_id']);
        $this->assertEquals(["You must select a valid pay plan."], $errors['pay_plan_id']);
        $this->assertEquals(["You must select a valid primary book."], $errors['primary_book_id']);
        $this->assertEquals(["You must select a valid sales rep."], $errors['sales_rep_id']);
    }
    
    /** @test **/
    public function it_returns_the_next_available_account_number()
    {
        $customer = factory(App\Customer::class)->create();
        $customer['account_num'] = '100';
        $this->post('/edit_customer', $customer->toArray());

        $customer = factory(App\Customer::class)->create();
        $customer['account_num'] = '200';
        $this->post('/edit_customer', $customer->toArray());

        $this->post('/next_customer_number');
        $data = json_decode($this->response->getContent(), true);

        $this->assertEquals('201', $data);
    }
}


