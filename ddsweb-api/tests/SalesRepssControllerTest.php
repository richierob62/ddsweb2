<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class SalesRepsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        $this
        ->post('/sales_reps')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        $this->post('/sales_reps');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        $this->post('/sales_rep_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        factory(App\SalesRep::class)->create();
        $sales_rep = factory(App\SalesRep::class)->create()->toArray();
        $sales_rep['name'] = '0000something-123name-something';
        $sales_rep['email'] = '0000something-123email@something.com';
        $this->post('/edit_sales_rep', $sales_rep);
        
        $this->post('/sales_reps', [
        'filters' => [
        'name' => '123name',
        'email' => '123email',
        'id' => $sales_rep['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/sales_reps', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/sales_reps', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $sales_rep['name']);
        
        $this->post('/sales_reps');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_rep()
    {
        factory(App\SalesRep::class)->create();
        $this->post('/sales_reps');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/sales_rep', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_rep_id_does_not_exist()
    {
        $this
        ->post('/sales_rep', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_sales_rep_in_the_database()
    {
        
        $this->post('/new_sales_rep', [
        'name' => 'foo',
        'email' => 'foo@example.com'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('foo@example.com', $data['email']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('sales_reps', ['name' => 'foo']);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $sales_rep = factory(App\SalesRep::class)->create();
        
        $id = $sales_rep->id;
        
        $this->post('/edit_sales_rep', [
        'id' => $id,
        'email' => 'bar@example.com',
        'name' => 'foo_edited'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('sales_reps', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_sales_rep', [
        'id' => 9999999,
        'email' => 'foo@email.com',
        'name' => 'foo_edited'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_rep()
    {
        $sales_rep = factory(App\SalesRep::class)->create();
        
        $id = $sales_rep->id;
        
        $this->seeInDatabase('sales_reps', ['id' => $id]);
        
        $this
        ->post('/delete_sales_rep', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('sales_reps', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_sales_rep', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_sales_rep()
    {
        $this->post('/new_sales_rep', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["A sales rep name is required."], $errors['name']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_sales_rep()
    {
        
        $sales_rep = factory(App\SalesRep::class)->create();
        
        $this->post('/edit_sales_rep', ['id' => $sales_rep->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["A sales rep name is required."], $errors['name']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_sales_rep', [
        'email' => 'foo@example.com',
        'name' => 'foo'
        ]);
        
        $this->post('/new_sales_rep', [
        'email' => 'foo@example.com',
        'name' => 'foo'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That email has already been used."], $errors['email']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $sales_rep_1 = factory(App\SalesRep::class)->create();
        
        $sales_rep_2 = factory(App\SalesRep::class)->create();
        
        $this->post('/edit_sales_rep', [
        'id' => $sales_rep_2->id,
        'email' => $sales_rep_1->email,
        'name' => $sales_rep_1->name
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That email has already been used."], $errors['email']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        
        $this->post('/new_sales_rep', [
        'name' => 'foo',
        'email' => 'foo@'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        
        $this->assertEquals(["The email must be a valid email address."], $errors['email']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        $sales_rep = factory(App\SalesRep::class)->create()->toArray();
        
        $sales_rep['email'] = 'foo';
        
        $this->post('/edit_sales_rep', $sales_rep);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        
        $this->assertEquals(["The email must be a valid email address."], $errors['email']);
    }
    
}