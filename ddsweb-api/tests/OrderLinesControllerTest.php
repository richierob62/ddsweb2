<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class OrderLinesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->order = factory(App\Order::class)->create();
        $this->udac = factory(App\Udac::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\OrderLine::class, 3)->create();
        $this
        ->post('/order_lines')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\OrderLine::class, 3)->create();
        $this->post('/order_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\OrderLine::class, 3)->create();
        $this->post('/order_line_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $order_2 = factory(App\Order::class)->create()->toArray();
        $order_2['order_num'] = '000-123ord-something';
        $this->post('/edit_order', $order_2);

        
        $udac_2 = factory(App\Udac::class)->create()->toArray();
        $udac_2['name'] = 'something-123udac-something';
        $this->post('/edit_udac', $udac_2);
        

        factory(App\OrderLine::class, 6)->create();

        $order_line = factory(App\OrderLine::class)->create()->toArray();
        $order_line['order_id'] = $order_2['id'];
        $order_line['udac_id'] = $udac_2['id'];
        $this->post('/edit_order_line', $order_line);

        $this->post('/order_lines', [
        'filters' => [
        'order' => '123ord',
        'udac' => '123udac',
        'id' => $order_line['id']
        ],
        'sort_name' => 'order',
        'sort_dir' => 'desc'
        ]);

        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/order_lines', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/order_lines', [
        'filters' => [],
        'sort_name' => 'order',
        'sort_dir' => 'asc'
        ]);

        
        $data = json_decode($this->response->getContent(), true)['data'];

        $first_rec = $data[0];
        $this->assertEquals( (int)$first_rec['order_id'], $order_2['id']);
        
        $this->post('/order_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_order_line()
    {
        factory(App\OrderLine::class)->create();
        $this->post('/order_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        $rec_1 = $data[0];
        
        $this
        ->post('/order_line', ['id' => $id])
        ->seeStatusCode(200);
        
        $rec_2 = json_decode($this->response->getContent(), true)['data'];

        $this->assertEquals($rec_1['order_id'], $rec_2['order_id']);
        $this->assertEquals($rec_1['udac_id'], $rec_2['udac_id']);
        
        $this->assertArrayhasKey('created_at', $rec_2);
        $this->assertArrayhasKey('updated_at', $rec_2);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_order_line_id_does_not_exist()
    {
        $this
        ->post('/order_line', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_order_line_in_the_database()
    {
        $new = factory(App\OrderLine::class)->raw();
        $udac_id = $new['udac_id'];
        $order_id = $new['order_id'];

        $this->post('/new_order_line', $new);
        
        $body = json_decode($this->response->getContent(), true);

        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($udac_id, $data['udac_id']);
        $this->assertEquals($order_id, $data['order_id']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('order_lines', ['order_id' => $order_id]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $order_line = factory(App\OrderLine::class)->create();
        
        $edited = factory(App\OrderLine::class)->raw();
        $udac_id = $edited['udac_id'];
        $order_id = $edited['order_id'];
        $id = $order_line->id;
        $edited['id'] = $id;

        $this->post('/edit_order_line',$edited);
        
        $body = json_decode($this->response->getContent(), true);

        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('order_lines', ['udac_id' => $udac_id ]);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $updated = factory(App\OrderLine::class)->raw();
        $updated['id'] = 9999555599;
        
        $this->post('/edit_order_line', $updated);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_order_line()
    {
        $order_line = factory(App\OrderLine::class)->create();
        
        $id = $order_line->id;
        
        $this->seeInDatabase('order_lines', ['id' => $id]);
        
        $this
        ->post('/delete_order_line', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('order_lines', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_order_line', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_order_line()
    {
        $this->post('/new_order_line', [], ['Accept' => 'application/json']);

        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('udac_id', $errors);
        $this->assertArrayHasKey('order_id', $errors);
        
        $this->assertEquals(["A udac is required."], $errors['udac_id']);
        $this->assertEquals(["An order number is required."], $errors['order_id']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_order_line()
    {
        
        $order_line = factory(App\OrderLine::class)->create();
        
        $this->post('/edit_order_line', ['id' => $order_line->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('udac_id', $errors);
        $this->assertArrayHasKey('order_id', $errors);
        
        $this->assertEquals(["A udac is required."], $errors['udac_id']);
        $this->assertEquals(["An order number is required."], $errors['order_id']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        // N/A
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        // N/A
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        // N/A
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        // N/A
    }
    
    // type - create
    /** @test **/
    public function it_validates_reference_fields_on_create()
    {
        $new = factory(App\OrderLine::class)->raw();
        $new['order_id'] = 888888;
        $new['udac_id'] = 6666;
        
        $this->post('/new_order_line', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_id', $errors);
        $this->assertArrayHasKey('udac_id', $errors);
        
        $this->assertEquals(["You must select a valid order number."], $errors['order_id']);
        $this->assertEquals(["You must select a valid udac."], $errors['udac_id']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $order_line = factory(App\OrderLine::class)->create()->toArray();
        
        $order_line['order_id'] = 55555;
        $order_line['udac_id'] = 55555;
        
        $this->post('/edit_order_line', $order_line);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order_id', $errors);
        $this->assertArrayHasKey('udac_id', $errors);
        
        $this->assertEquals(["You must select a valid order number."], $errors['order_id']);
        $this->assertEquals(["You must select a valid udac."], $errors['udac_id']);
    }
    
    // /** @test **/
    // public function it_returns_the_next_available_sequence_number()
    // {
    //     $new = factory(App\OrderLine::class)->raw();
    //     $sequence = $new['sequence'];
    //     $order_id =$new['order'];
    //     $this->post('/new_order_line', $new);

    //     $new = factory(App\OrderLine::class)->raw();
    //     $new['sequence'] = $sequence + 1;
    //     $new['order'] = $order;
    //     $this->post('/new_order_line', $new);
        
    //     $this->post('/next_sequence_number', ['order' => $order_id ]);
    //     $data = json_decode($this->response->getContent(), true);
        
    //     $this->assertEquals($sequence + 2, $data);
    // }
}