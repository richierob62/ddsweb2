<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class HeadingsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->page_type = factory(App\PageType::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\Heading::class, 3)->create();
        $this
        ->post('/headings')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\Heading::class, 3)->create();
        $this->post('/headings');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\Heading::class, 3)->create();
        $this->post('/heading_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $page_type_2 = factory(App\PageType::class)->create()->toArray();
        $page_type_2['name'] = 'something-123page_type_name-something';
        $this->post('/edit_page_type', $page_type_2);
        
        factory(App\Heading::class, 6)->create();
        $heading = factory(App\Heading::class)->create()->toArray();
        $heading['name'] = '0000something-123name-something';
        $heading['heading_num'] = '0000something-123heading_num-something';
        $heading['sort_name'] = 'something-123sort_name-something';
        $heading['page_type'] = $page_type_2['id'];
        $this->post('/edit_heading', $heading);
        
        $this->post('/headings', [
        'filters' => [
        'name' => '123name',
        'heading_num' => '123heading_num',
        'sort_name' => '123sort_name',
        'page_type' => '123page_type_name',
        'id' => $heading['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/headings', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/headings', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $heading['name']);
        
        $this->post('/headings');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_heading()
    {
        factory(App\Heading::class)->create();
        $this->post('/headings');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/heading', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_heading_id_does_not_exist()
    {
        $this
        ->post('/heading', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_heading_in_the_database()
    {
        $new = factory(App\Heading::class)->raw();
        $name = $new['name'];
        $page_type = $new['page_type'];
        
        $this->post('/new_heading', $new);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($name, $data['name']);
        $this->assertEquals($page_type, $data['page_type']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('headings', ['name' => $name]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $heading = factory(App\Heading::class)->create();
        
        $edited = factory(App\Heading::class)->raw();
        $name = $edited['name'];
        $page_type = $edited['page_type'];
        $id = $heading->id;
        $edited['id'] = $id;
        
        $this->post('/edit_heading',$edited);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('headings', ['name' => $name ]);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $updated = factory(App\Heading::class)->raw();
        $updated['id'] = 999999;
        
        $this->post('/edit_heading', $updated);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_heading()
    {
        $heading = factory(App\Heading::class)->create();
        
        $id = $heading->id;
        
        $this->seeInDatabase('headings', ['id' => $id]);
        
        $this
        ->post('/delete_heading', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('headings', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_heading', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_heading()
    {
        $this->post('/new_heading', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('heading_num', $errors);
        $this->assertArrayHasKey('sort_name', $errors);
        
        $this->assertEquals(["A heading name is required."], $errors['name']);
        $this->assertEquals(["A heading number is required."], $errors['heading_num']);
        $this->assertEquals(["A sort heading is required."], $errors['sort_name']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_heading()
    {
        
        $heading = factory(App\Heading::class)->create();
        
        $this->post('/edit_heading', ['id' => $heading->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('heading_num', $errors);
        $this->assertArrayHasKey('sort_name', $errors);
        
        $this->assertEquals(["A heading name is required."], $errors['name']);
        $this->assertEquals(["A heading number is required."], $errors['heading_num']);
        $this->assertEquals(["A sort heading is required."], $errors['sort_name']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        $new = factory(App\Heading::class)->raw();
        
        $this->post('/new_heading', $new);
        
        $this->post('/new_heading', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('heading_num', $errors);
        $this->assertArrayHasKey('sort_name', $errors);
        
        $this->assertEquals(["That heading name has already been used."], $errors['name']);
        $this->assertEquals(["That heading number has already been used."], $errors['heading_num']);
        $this->assertEquals(["That sort heading has already been used."], $errors['sort_name']);
        
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $heading_1 = factory(App\Heading::class)->create();
        
        $heading_2 = factory(App\Heading::class)->create();
        
        $this->post('/edit_heading', [
        'id' => $heading_2->id,
        'sort_name' => $heading_1->sort_name,
        'heading_num' => $heading_1->heading_num,
        'page_type' => $this->page_type->id,
        'name' => $heading_1->name
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('heading_num', $errors);
        $this->assertArrayHasKey('sort_name', $errors);
        
        $this->assertEquals(["That heading name has already been used."], $errors['name']);
        $this->assertEquals(["That heading number has already been used."], $errors['heading_num']);
        $this->assertEquals(["That sort heading has already been used."], $errors['sort_name']);
        
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
        $new = factory(App\Heading::class)->raw();
        $new['page_type'] = 888888;
        
        $this->post('/new_heading', $new);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('page_type', $errors);
        
        $this->assertEquals(["You must select a valid page type."], $errors['page_type']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $heading = factory(App\Heading::class)->create()->toArray();
        
        $heading['page_type'] = NULL;
        
        $this->post('/edit_heading', $heading);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('page_type', $errors);
        
        $this->assertEquals(["You must select a valid page type."], $errors['page_type']);
    }
    
}