<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class FindingLinesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\FindingLine::class, 3)->create();
        $this
        ->post('/finding_lines')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\FindingLine::class, 3)->create();
        $this->post('/finding_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\FindingLine::class, 3)->create();
        $this->post('/finding_line_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\FindingLine::class, 6)->create();
        $finding_line = factory(App\FindingLine::class)->create()->toArray();
        $finding_line['name'] = '0000something-123name-something';
        $finding_line['code'] = '0000something-123code';
        $this->post('/edit_finding_line', $finding_line);
        
        $this->post('/finding_lines', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'id' => $finding_line['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/finding_lines', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/finding_lines', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $finding_line['name']);
        
        $this->post('/finding_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_finding_line()
    {
        factory(App\FindingLine::class)->create();
        $this->post('/finding_lines');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/finding_line', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_finding_line_id_does_not_exist()
    {
        $this
        ->post('/finding_line', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_finding_line_in_the_database()
    {
        
        $this->post('/new_finding_line', [
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
        ->seeInDatabase('finding_lines', [
        'name' => 'foo',
        'code' => 'foo'
        ]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $finding_line = factory(App\FindingLine::class)->create();
        
        $id = $finding_line->id;
        
        $this->post('/edit_finding_line', [
        'id' => $finding_line->id,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('finding_lines', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_finding_line', [
        'id' => 9999999,
        'name' => 'foo_edited',
        'code' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_finding_line()
    {
        $finding_line = factory(App\FindingLine::class)->create();
        
        $id = $finding_line->id;
        
        $this->seeInDatabase('finding_lines', ['id' => $id]);
        
        $this
        ->post('/delete_finding_line', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('finding_lines', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_finding_line', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_finding_line()
    {
        $this->post('/new_finding_line', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A finding line name is required."], $errors['name']);
        $this->assertEquals(["A finding line code is required."], $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_finding_line()
    {
        
        $finding_line = factory(App\FindingLine::class)->create();
        
        $this->post('/edit_finding_line', ['id' => $finding_line->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A finding line name is required."], $errors['name']);
        $this->assertEquals(["A finding line code is required."], $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_finding_line', [
        'code' => 'foo',
        'name' => 'foo'
        ]);
        
        $this->post('/new_finding_line', [
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
        
        $finding_line_1 = factory(App\FindingLine::class)->create();
        
        $finding_line_2 = factory(App\FindingLine::class)->create();
        
        $this->post('/edit_finding_line', [
        'id' => $finding_line_2->id,
        'name' => $finding_line_1->name,
        'code' => $finding_line_1->code
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