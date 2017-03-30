<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class LocalForeignsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\LocalForeign::class, 3)->create();
        $this
        ->post('/local_foreigns')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\LocalForeign::class, 3)->create();
        $this->post('/local_foreigns');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\LocalForeign::class, 3)->create();
        $this->post('/local_foreign_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\LocalForeign::class, 6)->create();
        $local_foreign = factory(App\LocalForeign::class)->create()->toArray();
        $local_foreign['name'] = '0000something-123name-something';
        $local_foreign['code'] = '0000something-123code';
        $this->post('/edit_local_foreign', $local_foreign);
        
        $this->post('/local_foreigns', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $local_foreign['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/local_foreigns', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/local_foreigns', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $local_foreign['name']);
        
        $this->post('/local_foreigns');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_local_foreign()
    {
        factory(App\LocalForeign::class)->create();
        $this->post('/local_foreigns');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/local_foreign', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_local_foreign_id_does_not_exist()
    {
        $this
        ->post('/local_foreign', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_local_foreign_in_the_database()
    {
        
        $this->post('/new_local_foreign', [
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
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('local_foreigns', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $local_foreign = factory(App\LocalForeign::class)->create();
        
        $id = $local_foreign->id;
        
        $this->post('/edit_local_foreign', [
        'id' => $local_foreign->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('local_foreigns', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_local_foreign', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_local_foreign()
    {
        $local_foreign = factory(App\LocalForeign::class)->create();
        
        $id = $local_foreign->id;
        
        $this->seeInDatabase('local_foreigns', ['id' => $id]);
        
        $this
        ->post('/delete_local_foreign', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('local_foreigns', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_local_foreign', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_local_foreign()
    {
        $this->post('/new_local_foreign', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A local\/foreign name is required."], $errors['name']);
        $this->assertEquals(["A local\/foreign code is required."], $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_local_foreign()
    {
        
        $local_foreign = factory(App\LocalForeign::class)->create();
        
        $this->post('/edit_local_foreign', ['id' => $local_foreign->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A local\/foreign name is required."], $errors['name']);
        $this->assertEquals(["A local\/foreign code is required."], $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_local_foreign', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_local_foreign', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["That name has already been used."], $errors['name']);
        $this->assertEquals(["That code has already been used."], $errors['code']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $local_foreign_1 = factory(App\LocalForeign::class)->create();
        
        $local_foreign_2 = factory(App\LocalForeign::class)->create();
        
        $this->post('/edit_local_foreign', [
        'id' => $local_foreign_2->id,
        'name' => $local_foreign_1->name,
        'code' => $local_foreign_1->code
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["That code has already been used."], $errors['code']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        
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