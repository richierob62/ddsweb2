<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class PayPlansControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\PayPlan::class, 3)->create();
        $this
        ->post('/pay_plans')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\PayPlan::class, 3)->create();
        $this->post('/pay_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\PayPlan::class, 3)->create();
        $this->post('/pay_plan_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\PayPlan::class, 6)->create();
        $pay_plan = factory(App\PayPlan::class)->create()->toArray();
        $pay_plan['name'] = '0000something-123name-something';
        $pay_plan['code'] = '0000something-123code';
        $this->post('/edit_pay_plan', $pay_plan);
        
        $this->post('/pay_plans', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $pay_plan['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/pay_plans', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/pay_plans', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $pay_plan['name']);
        
        $this->post('/pay_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_pay_plan()
    {
        factory(App\PayPlan::class)->create();
        $this->post('/pay_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/pay_plan', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_pay_plan_id_does_not_exist()
    {
        $this
        ->post('/pay_plan', ['id' => 999999])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    /** @test **/
    public function it_saves_new_pay_plan_in_the_database()
    {
        
        $this->post('/new_pay_plan', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('foo', $data['code']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['created' => true])
        ->seeInDatabase('pay_plans', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $pay_plan = factory(App\PayPlan::class)->create();
        
        $id = $pay_plan->id;
        
        $this->post('/edit_pay_plan', [
        'id' => $pay_plan->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('pay_plans', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_pay_plan', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_pay_plan()
    {
        $pay_plan = factory(App\PayPlan::class)->create();
        
        $id = $pay_plan->id;
        
        $this->seeInDatabase('pay_plans', ['id' => $id]);
        
        $this
        ->post('/delete_pay_plan', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('pay_plans', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_pay_plan', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }

    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $pay_plan = factory(App\PayPlan::class)->create();

        $customer = factory(App\Customer::class)->raw();
        $customer['pay_plan_id'] = $pay_plan->id;
        $this->post('/new_customer', $customer);

        $this
        ->post('/delete_pay_plan', ['id' => $pay_plan->id])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Cannot be deleted: It is being used']]);
    }


    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_pay_plan()
    {
        $this->post('/new_pay_plan', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("A pay plan name is required.", $errors['name']);
        $this->assertEquals("A pay plan code is required.", $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_pay_plan()
    {
        
        $pay_plan = factory(App\PayPlan::class)->create();
        
        $this->post('/edit_pay_plan', ['id' => $pay_plan->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("A pay plan name is required.", $errors['name']);
        $this->assertEquals("A pay plan code is required.", $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_pay_plan', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_pay_plan', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That name has already been used.", $errors['name']);
        $this->assertEquals("That code has already been used.", $errors['code']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $pay_plan_1 = factory(App\PayPlan::class)->create();
        
        $pay_plan_2 = factory(App\PayPlan::class)->create();
        
        $this->post('/edit_pay_plan', [
        'id' => $pay_plan_2->id,
        'name' => $pay_plan_1->name,
        'code' => $pay_plan_1->code
        ]);
        
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That code has already been used.", $errors['code']);
        $this->assertEquals("That name has already been used.", $errors['name']);
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        // no types on this one
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        // no types on this one
    }
    
}