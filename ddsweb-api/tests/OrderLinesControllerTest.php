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
    // $app->post('order_lines', 'OrderLinesController@orderLines');
    public function it_returns_the_lines_for_given_order_in_sequence_order()
    {
        $order_line_1 = factory(App\OrderLine::class)->create();
        $order_line_2 = factory(App\OrderLine::class)->raw();
        $order_line_2['order_id'] = $order_line_1->order_id;
        
        $order_num = App\Order::findOrFail($order_line_1->order_id)->order_num;
        
        $this->post('/new_order_line', $order_line_2);
        
        $this->post('/order_lines', [
        'filters' => [
        'order' => $order_num,
        ],
        'sort_name' => 'sequence',
        'sort_dir' => 'asc'
        ]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(2, sizeof($data));
        $this->assertEquals($order_line_1->id, $data[0]['id']);
        $this->assertEquals(1, $data[0]['sequence']);
        $this->assertEquals(2, $data[1]['sequence']);
    }
    
    // $app->post('order_line', 'OrderLinesController@orderLineByID');
    /** @test **/
    public function it_returns_a_valid_order_line_with_its_details()
    {
        
        // create some fields
        $field_1 = factory(App\Field::class)->create();
        $field_2 = factory(App\Field::class)->create();
        $field_3 = factory(App\Field::class)->create();
        
        // create an ad_type using those fields
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_3->id]);
        
        // create a udac of that ad_type
        $udac = factory(App\Udac::class)->create();
        $udac->ad_type_id = $ad_type->id;
        $udac->save();
        
        // create an order line using api
        $order_line = factory(App\OrderLine::class)->raw();
        $order_line['udac_id'] = $udac->id;
        $this->post('/new_order_line',$order_line);
        
        $order_line = json_decode($this->response->getContent(), true)['data'];
        
        $this
        ->post('/order_line', ['id' => $order_line['id']])
        ->seeStatusCode(200);
        
        $order_line = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayHasKey('fields', $order_line);
        $this->assertArrayHasKey('udac', $order_line);
        
        // create a udac of that ad_type
        $udac_2 = factory(App\Udac::class)->create();
        
        // change udac and update
        $order_line['udac_id'] = $udac_2->id;
        $this->post('/edit_order_line',$order_line);
        
        $this
        ->post('/order_line', ['id' => $order_line['id']])
        ->seeStatusCode(200);
        
        $order_line = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayHasKey('fields', $order_line);
        $this->assertArrayHasKey('udac', $order_line);
        
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
    public function returns_an_error_when_the_order_line_id_does_not_exist()
    {
        $this
        ->post('/order_line', ['id' => 999999])
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
        
        $this->post('/edit_order_line', ['id' => $order_line->id]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('udac_id', $errors);
        $this->assertArrayHasKey('order_id', $errors);
        
        $this->assertEquals(["A udac is required."], $errors['udac_id']);
        $this->assertEquals(["An order number is required."], $errors['order_id']);
        
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
    
    // $app->post('edit_udac_data', 'OrderLinesController@editUdacData');
    /** @test **/
    public function it_updates_the_udac_data_for_an_order_line()
    {
        
        // create a field
        $field_1 = factory(App\Field::class)->create();
        
        // create an ad_type using that fields
        $ad_type = factory(App\AdType::class)->create();
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        
        // create a udac of that ad_type
        $udac = factory(App\Udac::class)->create();
        $udac->ad_type_id = $ad_type->id;
        $udac->save();
        
        // create an order line using api
        $order_line = factory(App\OrderLine::class)->raw();
        $order_line['udac_id'] = $udac->id;
        $this->post('/new_order_line',$order_line);
        
        $order_line = json_decode($this->response->getContent(), true)['data'];
        
        $new_field_values = [
        $field_1->id => 'foo'
        ];
        
        $this
        ->post('/edit_udac_data',
        [
        'order_line_id' => $order_line['id'],
        'fields_data' => $new_field_values
        ])
        ->seeStatusCode(200);
        
        $data = json_decode($this->response->getContent(), true);
        
        $this->assertArrayHasKey('fields', $data);
        $this->assertEquals($data['fields'][0]['pivot']['value'],'foo');
        
    }
    
    /** @test **/
    // $app->post('promote_order_line', 'OrderLinesController@promoteOrderLine');
    public function it_moves_an_order_line_up_in_the_sequence()
    {
        $order_line_1 = factory(App\OrderLine::class)->create();
        $order_line_2 = factory(App\OrderLine::class)->raw();
        $order_line_2['order_id'] = $order_line_1->order_id;
        
        $order_num = App\Order::findOrFail($order_line_1->order_id)->order_num;
        
        $this->post('/new_order_line', $order_line_2);
        $order_line_2 = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(2, $order_line_2['sequence']);
        
        $this
        ->post('/promote_order_line',
        [
        'order_line_id' => $order_line_2['id'],
        'order_id' => $order_line_2['order_id']
        ])
        ->seeStatusCode(201);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, $data['sequence']);
    }
    
    /** @test **/
    // $app->post('demote_order_line', 'OrderLinesController@demoteOrderLine');
    public function it_moves_an_order_line_down_in_the_sequence()
    {
        $order_line_1 = factory(App\OrderLine::class)->create();
        $order_line_2 = factory(App\OrderLine::class)->raw();
        $order_line_2['order_id'] = $order_line_1->order_id;
        
        $order_num = App\Order::findOrFail($order_line_1->order_id)->order_num;
        
        $this->post('/new_order_line', $order_line_2);
        $order_line_2 = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(2, $order_line_2['sequence']);
        
        $this
        ->post('/demote_order_line',
        [
        'order_line_id' => $order_line_1['id'],
        'order_id' => $order_line_1['order_id']
        ])
        ->seeStatusCode(201);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(2, $data['sequence']);
    }    
    
    
}