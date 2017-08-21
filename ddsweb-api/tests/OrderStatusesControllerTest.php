<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;


class OrderStatusesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\OrderStatus::class, 3)->create();
        $this
        ->post('/order_statuses')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\OrderStatus::class, 3)->create();
        $this->post('/order_statuses');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\OrderStatus::class, 3)->create();
        $this->post('/order_status_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\OrderStatus::class, 6)->create();
        $order_status = factory(App\OrderStatus::class)->create()->toArray();
        $order_status['name'] = '0000something-123name-something';
        $order_status['code'] = '0000something-123code';
        $this->post('/edit_order_status', $order_status);
        
        $this->post('/order_statuses', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $order_status['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/order_statuses', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/order_statuses', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $order_status['name']);
        
        $this->post('/order_statuses');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_order_status()
    {
        factory(App\OrderStatus::class)->create();
        $this->post('/order_statuses');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/order_status', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_order_status_id_does_not_exist()
    {
        $this
        ->post('/order_status', ['id' => 999999])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    /** @test **/
    public function it_saves_new_order_status_in_the_database()
    {
        
        $this->post('/new_order_status', [
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
        ->seeInDatabase('order_statuses', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $order_status = factory(App\OrderStatus::class)->create();
        
        $id = $order_status->id;
        
        $this->post('/edit_order_status', [
        'id' => $order_status->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('order_statuses', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_order_status', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_order_status()
    {
        $order_status = factory(App\OrderStatus::class)->create();
        
        $id = $order_status->id;
        
        $this->seeInDatabase('order_statuses', ['id' => $id]);
        
        $this
        ->post('/delete_order_status', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('order_statuses', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_order_status', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }


    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $order_status = factory(App\OrderStatus::class)->create();

        $order = factory(App\Order::class)->raw();
        $order['order_status_id'] = $order_status->id;
        $this->post('/new_order', $order);

        $this
        ->post('/delete_order_status', ['id' => $order_status->id])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Cannot be deleted: It is being used']]);
    }



    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_order_status()
    {
        $this->post('/new_order_status', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("An order status name is required.", $errors['name']);
        $this->assertEquals("An order status code is required.", $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_order_status()
    {
        
        $order_status = factory(App\OrderStatus::class)->create();
        
        $this->post('/edit_order_status', ['id' => $order_status->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("An order status name is required.", $errors['name']);
        $this->assertEquals("An order status code is required.", $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_order_status', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_order_status', [
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
        
        $order_status_1 = factory(App\OrderStatus::class)->create();
        
        $order_status_2 = factory(App\OrderStatus::class)->create();
        
        $this->post('/edit_order_status', [
        'id' => $order_status_2->id,
        'name' => $order_status_1->name,
        'code' => $order_status_1->code
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