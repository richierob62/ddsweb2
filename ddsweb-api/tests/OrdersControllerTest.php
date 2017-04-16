<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;
use Carbon\Carbon;

class OrdersControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->primary_book = factory(App\PrimaryBook::class)->create();
        $this->customer = factory(App\Customer::class)->create();
        $this->sales_rep = factory(App\SalesRep::class)->create();
        $this->order_status = factory(App\OrderStatus::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\Order::class, 3)->create();
        $this
        ->post('/orders')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\Order::class, 3)->create();
        $this->post('/orders');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\Order::class, 3)->create();
        $this->post('/order_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $primary_book_2 = factory(App\PrimaryBook::class)->create()->toArray();
        $primary_book_2['name'] = 'something-123pb';
        $this->post('/edit_primary_book', $primary_book_2);
        
        $customer_2 = factory(App\Customer::class)->create()->toArray();
        $customer_2['name'] = 'something-123cu';
        $this->post('/edit_customer', $customer_2);
        
        $sales_rep_2 = factory(App\SalesRep::class)->create()->toArray();
        $sales_rep_2['name'] = 'something-123sr';
        $this->post('/edit_sales_rep', $sales_rep_2);
        
        $order_status_2 = factory(App\OrderStatus::class)->create()->toArray();
        $order_status_2['name'] = 'something-123st';
        $this->post('/edit_order_status', $order_status_2);
        
        factory(App\Order::class, 6)->create();
        $order = factory(App\Order::class)->create()->toArray();
        $order['order_num'] = '000111111111';
        $order['order_date'] = new Carbon('2017-12-31');
        $order['primary_book_id'] = $primary_book_2['id'];
        $order['customer_id'] = $customer_2['id'];
        $order['sales_rep_id'] = $sales_rep_2['id'];
        $order['order_status_id'] = $order_status_2['id'];

        $this->post('/edit_order', $order);
        
        $this->post('/orders', [
        'filters' => [
        'order_num' => '111111111',
        'order_date' => '2017-12-31',
        'primary_book' => '123pb',
        'customer' => '123cu',
        'sales_rep' => '123sr',
        'order_status' => '123st',
        'id' => $order['id']
        ],
        'sort_name' => 'order_num',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/orders', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/orders', [
        'filters' => [],
        'sort_name' => 'order_num',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['order_num'], $order['order_num']);
        
        $this->post('/orders');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/   
    public function it_returns_a_valid_order()
    {
        factory(App\Order::class)->create();
        $this->post('/orders');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/order', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_order_id_does_not_exist()
    {
        $this
        ->post('/order', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_order_in_the_database()
    {
        $new = factory(App\Order::class)->raw();
        $order_num = $new['order_num'];
        $order_date = $new['order_date'];
        $this->post('/new_order', $new);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($order_num, $data['order_num']);
        $this->assertEquals($order_date, $data['order_date']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('orders', ['order_num' => $order_num]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $order = factory(App\Order::class)->create();
        
        $edited = factory(App\Order::class)->raw();
        $order_num = $edited['order_num'];
        $order_date = $edited['order_date'];
        $id = $order->id;
        $edited['id'] = $id;
        
        $this->post('/edit_order',$edited);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('orders', ['order_num' => $order_num ]);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $updated = factory(App\Order::class)->raw();
        $updated['id'] = 999999;
        
        $this->post('/edit_order', $updated);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_order()
    {
        $order = factory(App\Order::class)->create();
        
        $id = $order->id;
        
        $this->seeInDatabase('orders', ['id' => $id]);
        
        $this
        ->post('/delete_order', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('orders', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_order', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_order()
    {
        $this->post('/new_order', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_num', $errors);
        $this->assertArrayHasKey('order_date', $errors);
        
        $this->assertEquals(["An order number is required."], $errors['order_num']);
        $this->assertEquals(["An order date is required."], $errors['order_date']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_order()
    {
        
        $order = factory(App\Order::class)->create();
        
        $this->post('/edit_order', ['id' => $order->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_num', $errors);
        $this->assertArrayHasKey('order_date', $errors);
        
        $this->assertEquals(["An order number is required."], $errors['order_num']);
        $this->assertEquals(["An order date is required."], $errors['order_date']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        $new = factory(App\Order::class)->raw();
        
        $this->post('/new_order', $new);
        
        $this->post('/new_order', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_num', $errors);
        
        $this->assertEquals(["That order number has already been used."], $errors['order_num']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $order_1 = factory(App\Order::class)->create();
        
        $order_2 = factory(App\Order::class)->create();
        
        $this->post('/edit_order', [
        'id' => $order_2->id,
        'order_num' => $order_1->order_num,
        'order_date' => (new Carbon()),
        'customer_id' => $this->customer->id,
        'order_status_id' => $this->order_status->id,
        'primary_book_id' => $this->primary_book->id,
        'sales_rep_id' => $this->sales_rep->id
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_num', $errors);
        
        $this->assertEquals(["That order number has already been used."], $errors['order_num']);
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        $new = factory(App\Order::class)->raw();
        $new['order_date'] = 'foo';
        
        $this->post('/new_order', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_date', $errors);
        
        $this->assertEquals(["The order date must be a valid date."], $errors['order_date']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        $order = factory(App\Order::class)->create()->toArray();
        
        $order['order_date'] = 'foo';
        
        $this->post('/edit_order', $order);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_date', $errors);
        
        $this->assertEquals(["The order date must be a valid date."], $errors['order_date']);
    }
    
    // type - create
    /** @test **/
    public function it_validates_reference_fields_on_create()
    {
        $new = factory(App\Order::class)->raw();
        $new['customer_id'] = NULL;
        $new['order_status_id'] = 888888;
        $new['primary_book_id'] = NULL;
        $new['sales_rep_id'] = 888888;
        
        $this->post('/new_order', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('customer_id', $errors);
        $this->assertArrayHasKey('order_status_id', $errors);
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('sales_rep_id', $errors);
        
        $this->assertEquals(["You must select a customer."], $errors['customer_id']);
        $this->assertEquals(["You must select an order status."], $errors['order_status_id']);
        $this->assertEquals(["You must select a primary book."], $errors['primary_book_id']);
        $this->assertEquals(["You must select a sales rep."], $errors['sales_rep_id']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $order = factory(App\Order::class)->create()->toArray();
        
        $order['customer_id'] = 88888888;
        $order['order_status_id'] = NULL;
        $order['primary_book_id'] = 88888888;
        $order['sales_rep_id'] = NULL;
        
        $this->post('/edit_order', $order);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('customer_id', $errors);
        $this->assertArrayHasKey('order_status_id', $errors);
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('sales_rep_id', $errors);
        
        $this->assertEquals(["You must select a customer."], $errors['customer_id']);
        $this->assertEquals(["You must select an order status."], $errors['order_status_id']);
        $this->assertEquals(["You must select a primary book."], $errors['primary_book_id']);
        $this->assertEquals(["You must select a sales rep."], $errors['sales_rep_id']);
    }
    
    /** @test **/
    public function it_returns_the_next_available_order_number()
    {
        $order = factory(App\Order::class)->create();
        $order['order_num'] = '100';
        $this->post('/edit_order', $order->toArray());

        $order = factory(App\Order::class)->create();
        $order['order_num'] = '200';
        $this->post('/edit_order', $order->toArray());

        $this->post('/next_order_number');
        $data = json_decode($this->response->getContent(), true);

        $this->assertEquals('201', $data);
    }

    /** @test **/
    public function it_deletes_order_lines_when_deleting_an_order()
    {

        $order = factory(App\Order::class)->create();
        
        $id = $order->id;

        // add order_line
        $new = factory(App\OrderLine::class)->raw();
        $new['order_id'] = $order->id;    
        $this->post('/new_order_line', $new);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('order_lines', ['order_id' => $order->id]);

        $this->post('/delete_order', ['id' => $id]);
        
        $this->notSeeInDatabase('order_lines', ['order_id' => $order->id]);

    }

}