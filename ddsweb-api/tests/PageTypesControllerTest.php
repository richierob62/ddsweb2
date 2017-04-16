<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class PageTypesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\PageType::class, 3)->create();
        $this
        ->post('/page_types')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\PageType::class, 3)->create();
        $this->post('/page_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\PageType::class, 3)->create();
        $this->post('/page_type_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\PageType::class, 6)->create();
        $page_type = factory(App\PageType::class)->create()->toArray();
        $page_type['name'] = '0000something-123name-something';
        $page_type['code'] = '0000something-123code';
        $this->post('/edit_page_type', $page_type);
        
        $this->post('/page_types', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $page_type['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/page_types', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/page_types', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $page_type['name']);
        
        $this->post('/page_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_page_type()
    {
        factory(App\PageType::class)->create();
        $this->post('/page_types');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/page_type', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_page_type_id_does_not_exist()
    {
        $this
        ->post('/page_type', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_page_type_in_the_database()
    {
        
        $this->post('/new_page_type', [
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
        ->seeInDatabase('page_types', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $page_type = factory(App\PageType::class)->create();
        
        $id = $page_type->id;
        
        $this->post('/edit_page_type', [
        'id' => $page_type->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('page_types', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_page_type', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_page_type()
    {
        $page_type = factory(App\PageType::class)->create();
        
        $id = $page_type->id;
        
        $this->seeInDatabase('page_types', ['id' => $id]);
        
        $this
        ->post('/delete_page_type', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('page_types', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_page_type', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }



    /** @test **/
    public function delete_should_fail_if_id_in_use_by_a_heading()
    {
        $page_type = factory(App\PageType::class)->create();

        $heading = factory(App\Heading::class)->raw();
        $heading['page_type_id'] = $page_type->id;
        $this->post('/new_heading', $heading);

        $this
        ->post('/delete_page_type', ['id' => $page_type->id])
        ->seeStatusCode(422)
        ->seeJson(['error' => 'Cannot be deleted: Being used']);
    }

    /** @test **/
    public function delete_should_fail_if_id_in_use_by_an_ad_type()
    {
        $page_type = factory(App\PageType::class)->create();

        $ad_type = factory(App\AdType::class)->raw();
        $ad_type['page_type_id'] = $page_type->id;
        $this->post('/new_ad_type', $ad_type);

        $this
        ->post('/delete_page_type', ['id' => $page_type->id])
        ->seeStatusCode(422)
        ->seeJson(['error' => 'Cannot be deleted: Being used']);
    }


    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_page_type()
    {
        $this->post('/new_page_type', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A page type name is required."], $errors['name']);
        $this->assertEquals(["A page type code is required."], $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_page_type()
    {
        
        $page_type = factory(App\PageType::class)->create();
        
        $this->post('/edit_page_type', ['id' => $page_type->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A page type name is required."], $errors['name']);
        $this->assertEquals(["A page type code is required."], $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_page_type', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_page_type', [
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
        
        $page_type_1 = factory(App\PageType::class)->create();
        
        $page_type_2 = factory(App\PageType::class)->create();
        
        $this->post('/edit_page_type', [
        'id' => $page_type_2->id,
        'name' => $page_type_1->name,
        'code' => $page_type_1->code
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