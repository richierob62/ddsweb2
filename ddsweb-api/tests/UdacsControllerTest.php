<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class UdacsControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
        $this->primary_book = factory(App\PrimaryBook::class)->create();
        $this->ad_type = factory(App\AdType::class)->create();
    }
    
    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\Udac::class, 3)->create();
        $this
        ->post('/udacs')
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\Udac::class, 3)->create();
        $this->post('/udacs');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
        'data' => $data
        ];
        
        $this->seeJsonEquals($expected);
    }
    
    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\Udac::class, 3)->create();
        $this->post('/udac_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $primary_book_2 = factory(App\PrimaryBook::class)->create()->toArray();
        $primary_book_2['name'] = 'something-123primary_book_name-something';
        $this->post('/edit_primary_book', $primary_book_2);
        
        $ad_type_2 = factory(App\AdType::class)->create()->toArray();
        $ad_type_2['name'] = 'something-123ad_type_name-something';
        $this->post('/edit_ad_type', $ad_type_2);
        
        factory(App\Udac::class, 6)->create();
        $udac = factory(App\Udac::class)->create()->toArray();
        $udac['name'] = '0000something-123name-something';
        $udac['code'] = '0000something-123code-something';
        $udac['primary_book_id'] = $primary_book_2['id'];
        $udac['ad_type_id'] = $ad_type_2['id'];
        $this->post('/edit_udac', $udac);
        $this->post('/udacs', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'primary_book' => '123primary_book_name',
        'ad_type' => '123ad_type_name',
        'id' => $udac['id']
        ],
        'sort_name'=> 'name',
        'sort_dir' => 'desc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));
        
        $this->post('/udacs', [
        'filters' => [],
        'sort_name'=> 'name',
        'sort_dir' => NULL
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
        $this->post('/udacs', [
        'filters' => [],
        'sort_name'=> 'name',
        'sort_dir' => 'asc'
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $udac['name']);
        
        $this->post('/udacs');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));
        
    }
    
    /** @test **/
    public function it_returns_a_valid_udac()
    {
        factory(App\Udac::class)->create();
        $this->post('/udacs');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];
        
        
        $expected = [
        'data' => $data[0]
        ];
        $this
        ->post('/udac', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJsonEquals($expected);
        
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);
        
    }
    
    /** @test **/
    public function returns_an_error_when_the_udac_id_does_not_exist()
    {
        $this
        ->post('/udac', ['id' => 999999])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    /** @test **/
    public function it_saves_new_udac_in_the_database()
    {
        $new = factory(App\Udac::class)->raw();
        $name = $new['name'];
        $primary_book_id = $new['primary_book_id'];
        
        $this->post('/new_udac', $new);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals($name, $data['name']);
        $this->assertEquals($primary_book_id, $data['primary_book_id']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['created' => true])
        ->seeInDatabase('udacs', ['name' => $name]);
        
    }
    
    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $udac = factory(App\Udac::class)->create();
        
        $edited = factory(App\Udac::class)->raw();
        $name = $edited['name'];
        $primary_book_id = $edited['primary_book_id'];
        $id = $udac->id;
        $edited['id'] = $id;
        
        $this->post('/edit_udac',$edited);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('udacs', ['name' => $name ]);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $updated = factory(App\Udac::class)->raw();
        $updated['id'] = 999999;
        
        $this->post('/edit_udac', $updated);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_udac()
    {
        $udac = factory(App\Udac::class)->create();
        
        $id = $udac->id;
        
        $this->seeInDatabase('udacs', ['id' => $id]);
        
        $this
        ->post('/delete_udac', ['id' => $id])
        ->seeStatusCode(200)
        ->seeJson(['deleted' => true]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);
        
        $this->notSeeInDatabase('udacs', ['id' => $id]);
    }
    
    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_udac', ['id' => 999999 ]);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }


    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $udac = factory(App\Udac::class)->create();

        $order_line = factory(App\OrderLine::class)->raw();
        $order_line['udac_id'] = $udac->id;
        $this->post('/new_order_line', $order_line);

        $this
        ->post('/delete_udac', ['id' => $udac->id])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Cannot be deleted: It is being used']]);
    }
    
        
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_udac()
    {
        $this->post('/new_udac', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("A udac name is required.", $errors['name']);
        $this->assertEquals("A udac code is required.", $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_udac()
    {
        
        $udac = factory(App\Udac::class)->create();
        
        $this->post('/edit_udac', ['id' => $udac->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("A udac name is required.", $errors['name']);
        $this->assertEquals("A udac code is required.", $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        $new = factory(App\Udac::class)->raw();
        
        $this->post('/new_udac', $new);
        
        $this->post('/new_udac', $new);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That udac name has already been used.", $errors['name']);
        $this->assertEquals("That udac code has already been used.", $errors['code']);
        
        
    }
    
    // unique - edit
    /** @test **/
    public function it_rejects_duplicate_names_on_edit()
    {
        
        $udac_1 = factory(App\Udac::class)->create();
        
        $udac_2 = factory(App\Udac::class)->create();
        
        $this->post('/edit_udac', [
        'id' => $udac_2->id,
        'code' => $udac_1->code,
        'primary_book' => $this->primary_book->id,
        'ad_type' => $this->ad_type->id,
        'name' => $udac_1->name
        ]);
        
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That udac name has already been used.", $errors['name']);
        $this->assertEquals("That udac code has already been used.", $errors['code']);
        
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
        $new = factory(App\Udac::class)->raw();
        $new['primary_book_id'] = 888888;
        $new['ad_type_id'] = 888888;
        
        $this->post('/new_udac', $new);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('ad_type_id', $errors);
        
        $this->assertEquals("You must select a valid primary book.", $errors['primary_book_id']);
        $this->assertEquals("You must select a valid ad type.", $errors['ad_type_id']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $udac = factory(App\Udac::class)->create()->toArray();
        
        $udac['primary_book_id'] = NULL;
        $udac['ad_type_id'] = NULL;
        
        $this->post('/edit_udac', $udac);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('primary_book_id', $errors);
        $this->assertArrayHasKey('ad_type_id', $errors);
        
        $this->assertEquals("You must select a valid primary book.", $errors['primary_book_id']);
        $this->assertEquals("You must select a valid ad type.", $errors['ad_type_id']);
    }
    
}