<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class SalesRepsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->compensation_plan = factory(App\CompensationPlan::class)->create();
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
        $sales_rep['phone'] = '555 555-5555';
        $sales_rep['is_rep'] = 1;
        $sales_rep['is_admin'] = 1;
        $sales_rep['is_active'] = 1;
        $this->post('/edit_sales_rep', $sales_rep);
        
        $this->post('/sales_reps', [
        'filters' => [
        'name' => '123name',
        'email' => '123email',
        'id' => $sales_rep['id'],
        'phone' => '555 555-5555',
        'is_rep' => 1,
        'is_admin' => 1,
        'is_active' => 1
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
        
        $new = factory(App\SalesRep::class)->raw();
        $name = $new['name'];
        $code = $new['code'];
        $email = $new['email'];
        $phone = $new['phone'];
        
        $this->post('/new_customer', $new);
        
        
        $this->post('/new_sales_rep', $new);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($name, $data['name']);
        $this->assertEquals($email, $data['email']);
        $this->assertEquals($phone, $data['phone']);
        $this->assertEquals($code, $data['code']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('sales_reps', $new);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $sales_rep = factory(App\SalesRep::class)->create();
        
        $id = $sales_rep->id;
        
        $this->post('/edit_sales_rep', [
        'id' => $sales_rep->id,
        'email' => 'bar@example.com',
        'name' => 'foo_edited',
        'code' => 'foo_edited',
        'phone' => '555 555-5555',
        'compensation_plan' => $sales_rep->compensation_plan
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
        'name' => 'foo_edited',
        'code' => 'foo_edited',
        'phone' => 'some phone',
        'compensation_plan' => $this->compensation_plan->id
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
        $this->assertArrayHasKey('code', $errors);
        $this->assertArrayHasKey('compensation_plan', $errors);
        
        $this->assertEquals(["A sales rep name is required."], $errors['name']);
        $this->assertEquals(["A sales rep code is required."], $errors['code']);
        $this->assertEquals(["A compensation plan is required."], $errors['compensation_plan']);
        
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
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["A sales rep name is required."], $errors['name']);
        $this->assertEquals(["A sales rep code is required."], $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_sales_rep', [
        'email' => 'foo@example.com',
        'code' => 'foo',
        'name' => 'foo',
        'phone' => 'some_phone',
        'compensation_plan' => $this->compensation_plan->id
        ]);
        
        $this->post('/new_sales_rep', [
        'email' => 'foo@example.com',
        'code' => 'foo',
        'name' => 'foo',
        'phone' => 'some_phone',
        'compensation_plan' => $this->compensation_plan->id
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('phone', $errors);
        
        $this->assertEquals(["That email has already been used."], $errors['email']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        $this->assertEquals(["That phone number has already been used."], $errors['phone']);
        
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
        'name' => $sales_rep_1->name,
        'phone' => $sales_rep_1->phone,
        'code' => $sales_rep_1->code
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('phone', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals(["That email has already been used."], $errors['email']);
        $this->assertEquals(["That code has already been used."], $errors['code']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        $this->assertEquals(["That phone number has already been used."], $errors['phone']);
        
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