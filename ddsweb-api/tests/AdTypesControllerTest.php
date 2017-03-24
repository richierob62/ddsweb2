<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class AdTypesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        $this
        ->post('/ad_types')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        $this->post('/ad_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        $this->post('/ad_type_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        factory(App\AdType::class)->create();
        $ad_type = factory(App\AdType::class)->create()->toArray();
        $ad_type['name'] = '0000something-123name-something';
        $ad_type['code'] = '0000something-123code';
        $this->post('/edit_ad_type', $ad_type);
        
        $this->post('/ad_types', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $ad_type['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/ad_types', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/ad_types', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $ad_type['name']);
        
        $this->post('/ad_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_ad_type()
    {
        factory(App\AdType::class)->create();
        $this->post('/ad_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/ad_type', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_ad_type_id_does_not_exist()
    {
        $this
        ->post('/ad_type', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_ad_type_in_the_database()
    {
        
        $this->post('/new_ad_type', [
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
        ->seeInDatabase('ad_types', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $ad_type = factory(App\AdType::class)->create();
        
        $id = $ad_type->id;
        
        $this->post('/edit_ad_type', [
        'id' => $ad_type->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('ad_types', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_ad_type', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_ad_type()
    {
        $ad_type = factory(App\AdType::class)->create();
        
        $id = $ad_type->id;
        
        $this->seeInDatabase('ad_types', ['id' => $id]);
        
        $this
        ->post('/delete_ad_type', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('ad_types', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_ad_type', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_ad_type()
    {
        $this->post('/new_ad_type', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["An ad type name is required."], $errors['name']);
        $this->assertEquals(["An ad type code is required."], $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_ad_type()
    {
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/edit_ad_type', ['id' => $ad_type->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["An ad type name is required."], $errors['name']);
        $this->assertEquals(["An ad type code is required."], $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_ad_type', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_ad_type', [
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
        
        $ad_type_1 = factory(App\AdType::class)->create();
        
        $ad_type_2 = factory(App\AdType::class)->create();
        
        $this->post('/edit_ad_type', [
        'id' => $ad_type_2->id,
        'name' => $ad_type_1->name,
        'code' => $ad_type_1->code
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