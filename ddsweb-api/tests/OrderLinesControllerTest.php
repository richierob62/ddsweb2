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
        $this->heading = factory(App\Heading::class)->create();
        $this->udac = factory(App\Udac::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        $this
        ->post('/order_lines')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
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
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        $this->post('/order_line_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $order_2 = factory(App\Order::class)->create()->toArray();
        $order_2['order_num'] = 'something-123ord-something';
        $this->post('/edit_order', $order_2);
        
        $heading_2 = factory(App\Heading::class)->create()->toArray();
        $heading_2['name'] = 'something-123head-something';
        $this->post('/edit_heading', $heading_2);
        
        $udac_2 = factory(App\Udac::class)->create()->toArray();
        $udac_2['name'] = 'something-123udac-something';
        $this->post('/edit_udac', $udac_2);
        
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        factory(App\OrderLine::class)->create();
        $order_line = factory(App\OrderLine::class)->create()->toArray();
        $order_line['sequence'] = 1;
        $order_line['order'] = $order_2['id'];
        $order_line['heading'] = $heading_2['id'];
        $order_line['udac'] = $udac_2['id'];
        $this->post('/edit_order_line', $order_line);
        
        $this->post('/order_lines', [
        'filters' => [
        'order' => '123ord',
        'heading' => '123head',
        'udac' => '123udac',
        'sequence' => 1,
        'id' => $order_line['id']
        ],
        'sort_name' => 'sequence',
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
        'sort_name' => 'sequence',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['id'], $order_line['id']);
        
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
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/order_line', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
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
        $sequence = $new['sequence'];
        $order = $new['order'];

        $this->post('/new_order_line', $new);
        
        $body = json_decode($this->response->getContent(), true);

        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($sequence, $data['sequence']);
        $this->assertEquals($order, $data['order']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('order_lines', ['order' => $order]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $order_line = factory(App\OrderLine::class)->create();
        
        $edited = factory(App\OrderLine::class)->raw();
        $sequence = $edited['sequence'];
        $order = $edited['order'];
        $id = $order_line->id;
        $edited['id'] = $id;

        $this->post('/edit_order_line',$edited);
        
        $body = json_decode($this->response->getContent(), true);

        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('order_lines', ['sequence' => $sequence ]);
        
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
        
        $this->assertArrayHasKey('sequence', $errors);
        
        $this->assertEquals(["A sequence number is required."], $errors['sequence']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_order_line()
    {
        
        $order_line = factory(App\OrderLine::class)->create();
        
        $this->post('/edit_order_line', ['id' => $order_line->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('sequence', $errors);
        
        $this->assertEquals(["A sequence number is required."], $errors['sequence']);
        
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
        $new['order'] = 888888;
        $new['heading'] = 888888;
        $new['udac'] = NULL;
        
        $this->post('/new_order_line', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order', $errors);
        $this->assertArrayHasKey('heading', $errors);
        $this->assertArrayHasKey('udac', $errors);
        
        $this->assertEquals(["You must select a valid order number."], $errors['order']);
        $this->assertEquals(["You must select a valid heading."], $errors['heading']);
        $this->assertEquals(["You must select a valid udac."], $errors['udac']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $order_line = factory(App\OrderLine::class)->create()->toArray();
        
        $order_line['order'] = NULL;
        $order_line['heading'] = NULL;
        $order_line['udac'] = NULL;
        
        $this->post('/edit_order_line', $order_line);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('order', $errors);
        $this->assertArrayHasKey('heading', $errors);
        $this->assertArrayHasKey('udac', $errors);
        
        $this->assertEquals(["You must select a valid order number."], $errors['order']);
        $this->assertEquals(["You must select a valid heading."], $errors['heading']);
        $this->assertEquals(["You must select a valid udac."], $errors['udac']);
    }
    
    /** @test **/
    public function it_returns_the_next_available_sequence_number()
    {
        $new = factory(App\OrderLine::class)->raw();
        $sequence = $new['sequence'];
        $order =$new['order'];
        $this->post('/new_order_line', $new);

        $new = factory(App\OrderLine::class)->raw();
        $new['sequence'] = $sequence + 1;
        $new['order'] = $order;
        $this->post('/new_order_line', $new);
        
        $this->post('/next_sequence_number', ['order' => $order ]);
        $data = json_decode($this->response->getContent(), true);
        
        $this->assertEquals($sequence + 2, $data);
    }
}