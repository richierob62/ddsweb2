<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class FieldsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\Field::class, 3)->create();
        $this
        ->post('/fields')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\Field::class, 3)->create();
        $this->post('/fields');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\Field::class, 3)->create();
        $this->post('/field_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\Field::class, 6)->create();
        $field = factory(App\Field::class)->create()->toArray();
        $field['name'] = '0000something-123name-something';
        $field['description'] = '0000something-123descrip';
        $this->post('/edit_field', $field);
        
        $this->post('/fields', [
        'filters' => [
        'name' => '123name',
        'description' => '123descrip',
        'id' => $field['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/fields', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/fields', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $field['name']);
        
        $this->post('/fields');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_field()
    {
        factory(App\Field::class)->create();
        $this->post('/fields');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/field', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_field_id_does_not_exist()
    {
        $this
        ->post('/field', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_field_in_the_database()
    {
        
        
        $this->post('/new_field', [
        'name' => 'foo',
        'description' => 'foo',
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('foo', $data['description']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('fields', [
        'name' => 'foo',
        'description' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $field = factory(App\Field::class)->create();
        
        $id = $field->id;
        
        $this->post('/edit_field', [
        'id' => $field->id,
        'name' => 'foo_edited',
        'description' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('fields', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_field', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'description' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_field()
    {
        $field = factory(App\Field::class)->create();
        
        $id = $field->id;
        
        $this->seeInDatabase('fields', ['id' => $id]);
        
        $this
        ->post('/delete_field', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('fields', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_field', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_field()
    {
        $this->post('/new_field', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('description', $errors);
        
        $this->assertEquals(["A field name is required."], $errors['name']);
        $this->assertEquals(["A field description is required."], $errors['description']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_field()
    {
        
        $field = factory(App\Field::class)->create();
        
        $this->post('/edit_field', ['id' => $field->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('description', $errors);
        
        $this->assertEquals(["A field name is required."], $errors['name']);
        $this->assertEquals(["A field description is required."], $errors['description']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $field = factory(App\Field::class)->create();
        
        $this->post('/new_field', [
        'description' => $field['description'],
        'name' => $field['name'],
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('description', $errors);
        
        $this->assertEquals(["That field name has already been used."], $errors['name']);
        $this->assertEquals(["That field description has already been used."], $errors['description']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $field_1 = factory(App\Field::class)->create();
        
        $field_2 = factory(App\Field::class)->create();
        
        $this->post('/edit_field', [
        'id' => $field_2->id,
        'name' => $field_1->name,
        'description' => $field_1->description,
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('description', $errors);
        
        $this->assertEquals(["That field name has already been used."], $errors['name']);
        $this->assertEquals(["That field description has already been used."], $errors['description']);
        
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
    
    // type - create
    /** @test **/
    public function it_validates_reference_fields_on_create()
    {
        // NA
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        // NA
    }
}