<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class CustomersControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        $customers = factory('App\Customer', 2)->create();
        $this
        ->post('/customers')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        $customers = factory('App\Customer', 2)->create();
        $this->post('/customers');
        
        $expected = [
        'data' => $customers->toArray()
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function it_returns_a_valid_book()
    {
        $customer = factory('App\Customer')->create();
        
        $expected = [
        'data' => $customer->toArray()
        ];
        
        $this
        ->post('/customer', ['id' => $customer->id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_book_id_does_not_exist()
    {
        $this
        ->post('/customer', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_customer_in_the_database()
    {
        $this->post('/new_customer', [
        'account_num' => '12345',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals(1, $data['category']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('customers', ['name' => 'foo']);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $this->post('/new_customer', [
        'account_num' => '12345',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo_new'
        ]);
        
        $id = json_decode($this->response->getContent(), true)['data']['id'];
        
        $this->post('/edit_customer', [
        'id' => $id,
        'account_num' => '44444',
        'category' => 2,
        'local_foreign' => 2,
        'pay_plan' => 2,
        'primary_book' => 2,
        'sales_rep' => 2,
        'name' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('customers', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        $this->post('/edit_customer', [
        'id' => 999999,
        'account_num' => '12345',
        'category' => 2,
        'local_foreign' => 2,
        'pay_plan' => 2,
        'primary_book' => 2,
        'sales_rep' => 2,
        'name' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_book()
    {
        $this->post('/new_customer', [
        'category' => 1,
        'account_num' => '12345',
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo'
        ]);
        
        $id = json_decode($this->response->getContent(), true)['data']['id'];
        
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
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_customer()
    {
        $this->post('/new_customer', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('category', $errors);
        $this->assertArrayHasKey('local_foreign', $errors);
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('pay_plan', $errors);
        $this->assertArrayHasKey('primary_book', $errors);
        $this->assertArrayHasKey('sales_rep', $errors);
        
        $this->assertEquals(["An account number is required."], $errors['account_num']);
        $this->assertEquals(["You must select a category."], $errors['category']);
        $this->assertEquals(["You must select local/foreign."], $errors['local_foreign']);
        $this->assertEquals(["A company name is required."], $errors['name']);
        $this->assertEquals(["You must select a pay plan."], $errors['pay_plan']);
        $this->assertEquals(["You must select a primary book."], $errors['primary_book']);
        $this->assertEquals(["You must select a sales rep."], $errors['sales_rep']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_customer()
    {
        
        $customer = factory(\App\Customer::class)->create();
        
        $this->post('/edit_customer', ['id' => $customer->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('account_num', $errors);
        $this->assertArrayHasKey('category', $errors);
        $this->assertArrayHasKey('local_foreign', $errors);
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('pay_plan', $errors);
        $this->assertArrayHasKey('primary_book', $errors);
        $this->assertArrayHasKey('sales_rep', $errors);
        
        $this->assertEquals(["An account number is required."], $errors['account_num']);
        $this->assertEquals(["You must select a category."], $errors['category']);
        $this->assertEquals(["You must select local/foreign."], $errors['local_foreign']);
        $this->assertEquals(["A company name is required."], $errors['name']);
        $this->assertEquals(["You must select a pay plan."], $errors['pay_plan']);
        $this->assertEquals(["You must select a primary book."], $errors['primary_book']);
        $this->assertEquals(["You must select a sales rep."], $errors['sales_rep']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_customer', [
        'account_num' => '12345',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo'
        ]);
        
        $this->post('/new_customer', [
        'account_num' => '12345',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo'
        ]);
        
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
        
        $this->post('/new_customer', [
        'account_num' => '11111',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo'
        ]);
        
        $this->post('/new_customer', [
        'account_num' => '22222',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'bar'
        ]);
        
        $id = json_decode($this->response->getContent(), true)['data']['id'];
        
        $this->post('/edit_customer', [
        'id' => $id,
        'account_num' => '11111',
        'category' => 2,
        'local_foreign' => 2,
        'pay_plan' => 2,
        'primary_book' => 2,
        'sales_rep' => 2,
        'name' => 'foo'
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
        
        $this->post('/new_customer', [
        'account_num' => '11111',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo',
        'billing_email' => 'foo',
        'email' => 'foo@'
        ]);
        
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
        
        $this->post('/new_customer', [
        'account_num' => '11111',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo',
        'billing_email' => 'foo@example.com',
        'email' => 'foo@example.com'
        ]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $data['billing_email'] = 'foo';
        $data['email'] = 'foo';
        
        $this->post('/edit_customer', $data);
        
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
        $this->markTestIncomplete();

        $this->post('/new_customer', [
        'account_num' => '11111',
        'category' => '1',
        'local_foreign' => 'junk',
        'pay_plan' => 'junk',
        'primary_book' => 'junk',
        'sales_rep' => '25698745296577',
        'name' => 'foo'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('category', $errors);
        $this->assertArrayHasKey('local_foreign', $errors);
        $this->assertArrayHasKey('pay_plan', $errors);
        $this->assertArrayHasKey('primary_book', $errors);
        $this->assertArrayHasKey('sales_rep', $errors);
        
        $this->assertEquals(["You must select a valid category"], $errors['category']);
        $this->assertEquals(["You must select a valid local/foreign"], $errors['local_foreign']);
        $this->assertEquals(["You must select a valid pay plan"], $errors['pay_plan']);
        $this->assertEquals(["You must select a valid primary book"], $errors['primary_book']);
        $this->assertEquals(["You must select a valid sales rep"], $errors['sales_rep']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        
        $this->markTestIncomplete();
        
        $this->post('/new_customer', [
        'account_num' => '11111',
        'category' => 1,
        'local_foreign' => 1,
        'pay_plan' => 1,
        'primary_book' => 1,
        'sales_rep' => 1,
        'name' => 'foo',
        'billing_email' => 'foo@example.com',
        'email' => 'foo@example.com'
        ]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $data['category'] = '1';
        $data['local_foreign'] = 'junk';
        $data['pay_plan'] = 'junk';
        $data['primary_book'] = '253698741112255';
        $data['sales_rep'] = '99';
        
        $this->post('/edit_customer', $data);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('category', $errors);
        $this->assertArrayHasKey('local_foreign', $errors);
        $this->assertArrayHasKey('pay_plan', $errors);
        $this->assertArrayHasKey('primary_book', $errors);
        $this->assertArrayHasKey('sales_rep', $errors);
        
        $this->assertEquals(["You must select a valid category"], $errors['category']);
        $this->assertEquals(["You must select a valid local/foreign"], $errors['local_foreign']);
        $this->assertEquals(["You must select a valid pay plan"], $errors['pay_plan']);
        $this->assertEquals(["You must select a valid primary book"], $errors['primary_book']);
        $this->assertEquals(["You must select a valid sales rep"], $errors['sales_rep']);
    }
    
}