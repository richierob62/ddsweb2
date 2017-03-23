<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;
use Carbon\Carbon;

class SourceBooksControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        $this
        ->post('/source_books')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        $this->post('/source_books');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        $this->post('/source_book_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        factory(App\SourceBook::class)->create();
        $source_book = factory(App\SourceBook::class)->create()->toArray();
        $source_book['name'] = '0000something-123name-something';
        $source_book['code'] = '0000something-123code-something';
        $source_book['pub_month'] = '2017-01-01';
        $source_book['yppa_num'] = 'something-123yppa_num-something';
        $this->post('/edit_source_book', $source_book);

        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->post('/source_books', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'pub_month' => '2017-01-01',
        'yppa_num' => '123yppa_num',
        'id' => $source_book['id']
        ],
        'sort_name' => 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/source_books', [
        'filters' => [],
        'sort_name' => NULL,
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/source_books', [
        'filters' => [],
        'sort_name' => 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $source_book['name']);
        
        $this->post('/source_books');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_source_book()
    {
        factory(App\SourceBook::class)->create();
        $this->post('/source_books');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/source_book', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_source_book_id_does_not_exist()
    {
        $this
        ->post('/source_book', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function it_saves_new_source_book_in_the_database()
    {
        
        $this->post('/new_source_book', [
        'code' => '12345',
        'name' => 'foo',
        'yppa_num'=> 'abc',
        'pub_month' => '2017-01-01',
        'sales_start' => '2017-02-01',
        'sales_close' => '2017-10-31'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('12345', $data['code']);
        $this->assertEquals('abc', $data['yppa_num']);
        $this->assertEquals('2017-01-01', $data['pub_month']);
        $this->assertEquals('2017-02-01', $data['sales_start']);
        $this->assertEquals('2017-10-31', $data['sales_close']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['created' => true])
        ->seeInDatabase('source_books', ['name' => 'foo']);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $source_book = factory(App\SourceBook::class)->create();
        
        $id = $source_book->id;
        
        $this->post('/edit_source_book', [
        'id' => $id,
        'code' => '12345',
        'name' => 'foo_edited',
        'yppa_num'=> 'abc',
        'pub_month' => '2017-01-01',
        'sales_start' => '2017-02-01',
        'sales_close' => '2017-10-31'
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(201)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('source_books', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $this->post('/edit_source_book', [
        'id' => 9999999,
        'code' => '12345',
        'name' => 'foo',
        'yppa_num'=> 'abc',
        'pub_month' => '2017-01-01',
        'sales_start' => '2017-02-01',
        'sales_close' => '2017-10-31'
        ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_source_book()
    {
        $source_book = factory(App\SourceBook::class)->create();
        
        $id = $source_book->id;
        
        $this->seeInDatabase('source_books', ['id' => $id]);
        
        $this
        ->post('/delete_source_book', ['id' => $id])
        ->seeStatusCode(201)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('source_books', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_source_book', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_source_book()
    {
        $this->post('/new_source_book', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        $this->assertArrayHasKey('pub_month', $errors);
        $this->assertArrayHasKey('sales_start', $errors);
        $this->assertArrayHasKey('sales_close', $errors);
        
        $this->assertEquals(["A source book name is required."], $errors['name']);
        $this->assertEquals(["A source book code is required."], $errors['code']);
        $this->assertEquals(["A publication month is required."], $errors['pub_month']);
        $this->assertEquals(["A sales start date is required."], $errors['sales_start']);
        $this->assertEquals(["A sales close date is required."], $errors['sales_close']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_source_book()
    {
        
        $source_book = factory(App\SourceBook::class)->create();
        
        $this->post('/edit_source_book', ['id' => $source_book->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        $this->assertArrayHasKey('pub_month', $errors);
        $this->assertArrayHasKey('sales_start', $errors);
        $this->assertArrayHasKey('sales_close', $errors);
        
        $this->assertEquals(["A source book name is required."], $errors['name']);
        $this->assertEquals(["A source book code is required."], $errors['code']);
        $this->assertEquals(["A publication month is required."], $errors['pub_month']);
        $this->assertEquals(["A sales start date is required."], $errors['sales_start']);
        $this->assertEquals(["A sales close date is required."], $errors['sales_close']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $this->post('/new_source_book', [
        'code' => '12345',
        'name' => 'foo',
        'yppa_num'=> 'abc',
        'pub_month' => '2017-01-01',
        'sales_start' => '2017-02-01',
        'sales_close' => '2017-10-31'
        ]);
        
        $this->post('/new_source_book', [
        'code' => '12345',
        'name' => 'foo',
        'yppa_num'=> 'abc',
        'pub_month' => '2017-01-01',
        'sales_start' => '2017-02-01',
        'sales_close' => '2017-10-31'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('code', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That code has already been used."], $errors['code']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $source_book_1 = factory(App\SourceBook::class)->create();
        
        $source_book_2 = factory(App\SourceBook::class)->create();
        
        $this->post('/edit_source_book', [
        'id' => $source_book_2->id,
        'code' => $source_book_1->code,
        'name' => $source_book_1->name
        ]);
        
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('code', $errors);
        $this->assertArrayHasKey('name', $errors);
        
        $this->assertEquals(["That code has already been used."], $errors['code']);
        $this->assertEquals(["That name has already been used."], $errors['name']);
        
    }
    
    
    // type - create
    /** @test **/
    public function it_validates_type_on_create()
    {
        
        $this->post('/new_source_book', [
        'code' => '12345',
        'name' => 'foo',
        'yppa_num'=> 'abc',
        'pub_month' => 'foo',
        'sales_start' => 'foo',
        'sales_close' => 'foo'
        ]);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('pub_month', $errors);
        $this->assertArrayHasKey('sales_start', $errors);
        $this->assertArrayHasKey('sales_close', $errors);
        
        $this->assertEquals(["Publication month must be a valid date."], $errors['pub_month']);
        $this->assertEquals(["Sales start must be a valid date."], $errors['sales_start']);
        $this->assertEquals(["Sales close must be a valid date."], $errors['sales_close']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_type_on_edit()
    {
        $source_book = factory(App\SourceBook::class)->create()->toArray();
        
        $source_book['pub_month'] = 'foo';
        $source_book['sales_start'] = 'foo';
        $source_book['sales_close'] = 'foo';
        $this->post('/edit_source_book', $source_book);
        
        $this->assertEquals(422, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('pub_month', $errors);
        $this->assertArrayHasKey('sales_start', $errors);
        $this->assertArrayHasKey('sales_close', $errors);
        
        $this->assertEquals(["Publication month must be a valid date."], $errors['pub_month']);
        $this->assertEquals(["Sales start must be a valid date."], $errors['sales_start']);
        $this->assertEquals(["Sales close must be a valid date."], $errors['sales_close']);
    }
    
    // type - create
    /** @test **/
    public function it_validates_reference_fields_on_create()
    {
        // N/A
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        // N/A
    }
    
}