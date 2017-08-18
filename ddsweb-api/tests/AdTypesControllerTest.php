<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;

class AdTypesControllerTest extends TestCase
{
    use DatabaseMigrations;
    
    public function setup()
    {
        parent::setup();
    }
    
    /** @test **/
    public function
    index_should_return_a_collection_of_records()
    {
        factory(App\AdType::class, 3)->create();
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
        factory(App\AdType::class, 3)->create();
        $this->post('/ad_type_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {
        
        $page_type_2 = factory(App\PageType::class)->create()->toArray();
        $page_type_2['name'] = 'something-123page_type_name-something';
        $this->post('/edit_page_type', $page_type_2);
        
        factory(App\AdType::class, 6)->create();
        $ad_type = factory(App\AdType::class)->create()->toArray();
        $ad_type['name'] = '0000something-123name-something';
        $ad_type['code'] = '0000something-123code';
        $ad_type['page_type_id'] = $page_type_2['id'];
        $this->post('/edit_ad_type', $ad_type);
        
        $this->post('/ad_types', [
        'filters' => [
        'name' => '123name',
        'code' => '123code',
        'page_type' => '123page_type',
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
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    /** @test **/
    public function it_saves_new_ad_type_in_the_database()
    {
        
        
        $page_type_2 = factory(App\PageType::class)->create()->toArray();
        
        $this->post('/new_ad_type', [
        'name' => 'foo',
        'code' => 'foo',
        'page_type_id' => $page_type_2['id']
        ]);
        
        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);
        
        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('foo', $data['code']);
        $this->assertEquals($page_type_2['id'], $data['page_type_id']);
        $this->assertTrue($data['id'] > 0);
        
        $this
        ->seeStatusCode(200)
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
        $ad_type->name = 'foo_edited';
        $ad_type->code = 'foo_edited';
        
        $id = $ad_type->id;
        
        $this->post('/edit_ad_type', $ad_type->toArray());
        
        $body = json_decode($this->response->getContent(), true);
        
        $this->assertArrayHasKey('data', $body);
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['updated' => true, 'id' => $id])
        ->seeInDatabase('ad_types', ['name' => 'foo_edited']);
        
    }
    
    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {
        
        $ad_type = factory(App\AdType::class)->create();
        $ad_type->id = 999999;
        $ad_type->name = 'foo_edited';
        $ad_type->code = 'foo_edited';
        
        $this->post('/edit_ad_type', $ad_type->toArray());
        
        $this
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    
    /** @test **/
    public function delete_should_remove_a_valid_ad_type()
    {
        $ad_type = factory(App\AdType::class)->create();
        
        $id = $ad_type->id;
        
        $this->seeInDatabase('ad_types', ['id' => $id]);
        
        $this
        ->post('/delete_ad_type', ['id' => $id])
        ->seeStatusCode(200)
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
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Not Found']]);
    }
    
    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $ad_type = factory(App\AdType::class)->create();
        
        $udac = factory(App\Udac::class)->raw();
        $udac['ad_type_id'] = $ad_type->id;
        $this->post('/new_udac', $udac);
        
        $this
        ->post('/delete_ad_type', ['id' => $ad_type->id])
        ->seeStatusCode(200)
        ->seeJson(['errors' => ['Cannot be deleted: It is being used']]);
    }
    
    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_ad_type()
    {
        $this->post('/new_ad_type', [], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("An ad type name is required.", $errors['name']);
        $this->assertEquals("An ad type code is required.", $errors['code']);
        
    }
    
    
    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_ad_type()
    {
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/edit_ad_type', ['id' => $ad_type->id], ['Accept' => 'application/json']);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("An ad type name is required.", $errors['name']);
        $this->assertEquals("An ad type code is required.", $errors['code']);
        
    }
    
    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/new_ad_type', [
        'code' => $ad_type['code'],
        'name' => $ad_type['name'],
        'page_type_id' => $ad_type['page_type_id']
        ]);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That name has already been used.", $errors['name']);
        $this->assertEquals("That code has already been used.", $errors['code']);
        
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
        'code' => $ad_type_1->code,
        'page_type_id' => $ad_type_2->page_type_id
        ]);
        
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);
        
        $this->assertEquals("That code has already been used.", $errors['code']);
        $this->assertEquals("That name has already been used.", $errors['name']);
        
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
        $new = factory(App\AdType::class)->raw();
        $new['page_type_id'] = 888888;
        
        $this->post('/new_ad_type', $new);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('page_type_id', $errors);
        
        $this->assertEquals("You must select a valid page type.", $errors['page_type_id']);
    }
    
    
    // type - edit
    /** @test **/
    public function it_validates_reference_fields_on_edit()
    {
        $ad_type = factory(App\AdType::class)->create()->toArray();
        
        $ad_type['page_type_id'] = NULL;
        
        $this->post('/edit_ad_type', $ad_type);
        
        $this->assertEquals(200, $this->response->getStatusCode());
        
        $errors = json_decode($this->response->getContent(), true)['errors'];
        
        $this->assertArrayHasKey('page_type_id', $errors);
        
        $this->assertEquals("You must select a valid page type.", $errors['page_type_id']);
    }
    
    /** @test **/
    // $app->post('get_fields', 'AdTypesController@getFields');
    public function it_returns_the_fields_for_given_ad_type_in_order()
    {
        $field_1 = factory(App\Field::class)->create();
        $field_2 = factory(App\Field::class)->create();
        
        $ad_type = factory(App\AdType::class)->create();
        $ad_type->fields()->attach($field_1->id, ['sequence' => 2]);
        $ad_type->fields()->attach($field_2->id, ['sequence' => 1]);
        
        $this->post('/get_fields', ['id' => $ad_type->id]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(2, sizeof($data));
        $this->assertEquals($field_2->id, $data[0]['id']);
        $this->assertEquals($field_1->id, $data[1]['id']);
        $this->assertEquals(1, $data[0]['pivot']['sequence']);
    }
    
    /** @test **/
    // $app->post('attach_field', 'AdTypesController@addField');
    public function it_adds_a_field_to_an_ad_type()
    {
        $field_1 = factory(App\Field::class)->create();
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        
        $this->seeStatusCode(200)
        ->seeJsonEquals([
        "created" => true,
        "data" => [
        "id" => $ad_type->id,
        "field" => $field_1->id,
        "sequence" => 1
        ]
        ]);
        
        
        // again
        
        $field_2 = factory(App\Field::class)->create();
        $field_3 = factory(App\Field::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_3->id]);
        
        $this->seeStatusCode(200)
        ->seeJsonEquals([
        "created" => true,
        "data" => [
        "id" => $ad_type->id,
        "field" => $field_3->id,
        "sequence" => 3
        ]
        ]);
        
    }
    
    
    /** @test **/
    // $app->post('remove_field', 'AdTypesController@deleteField');
    public function it_deletes_a_field_from_an_ad_type_and_renumbers_the_balance()
    {
        
        $field_1 = factory(App\Field::class)->create();
        $field_2 = factory(App\Field::class)->create();
        $field_3 = factory(App\Field::class)->create();
        $field_4 = factory(App\Field::class)->create();
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_3->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_4->id]);
        
        $this->post('/remove_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        
        $this->seeStatusCode(200)
        ->seeJsonEquals([
        "deleted" => true,
        "data" => [
        "id" => $ad_type->id,
        "field" => $field_2->id
        ]
        ]);
        
        
        $this->post('/get_fields', ['id' => $ad_type->id]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(3, sizeof($data));
        $this->assertEquals($field_1->id, $data[0]['id']);
        $this->assertEquals($field_3->id, $data[1]['id']);
        $this->assertEquals($field_4->id, $data[2]['id']);
        $this->assertEquals(1, $data[0]['pivot']['sequence']);
        $this->assertEquals(2, $data[1]['pivot']['sequence']);
        $this->assertEquals(3, $data[2]['pivot']['sequence']);
        
    }
    
    /** @test **/
    // $app->post('promote_field', 'AdTypesController@promoteField');
    public function it_moves_a_field_up_in_sequence()
    {
        
        $field_1 = factory(App\Field::class)->create();
        $field_2 = factory(App\Field::class)->create();
        $field_3 = factory(App\Field::class)->create();
        $field_4 = factory(App\Field::class)->create();
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_3->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_4->id]);
        
        $this->post('/promote_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        
        $this->seeStatusCode(200)
        ->seeJsonEquals([
        "promoted" => true,
        "data" => [
        "id" => $ad_type->id,
        "field" => $field_2->id,
        "sequence" => 1
        ]
        ]);
        
        
        $this->post('/get_fields', ['id' => $ad_type->id]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(4, sizeof($data));
        $this->assertEquals($field_2->id, $data[0]['id']);
        $this->assertEquals($field_1->id, $data[1]['id']);
        $this->assertEquals($field_3->id, $data[2]['id']);
        $this->assertEquals($field_4->id, $data[3]['id']);
        $this->assertEquals(1, $data[0]['pivot']['sequence']);
        $this->assertEquals(2, $data[1]['pivot']['sequence']);
        $this->assertEquals(3, $data[2]['pivot']['sequence']);
        $this->assertEquals(4, $data[3]['pivot']['sequence']);
        
    }
    
    /** @test **/
    // $app->post('demote_field', 'AdTypesController@demoteField');
    public function it_moves_a_field_down_in_sequence()
    {
        
        $field_1 = factory(App\Field::class)->create();
        $field_2 = factory(App\Field::class)->create();
        $field_3 = factory(App\Field::class)->create();
        $field_4 = factory(App\Field::class)->create();
        
        $ad_type = factory(App\AdType::class)->create();
        
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_1->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_3->id]);
        $this->post('/attach_field', ['id' => $ad_type->id, 'field' => $field_4->id]);
        
        $this->post('/demote_field', ['id' => $ad_type->id, 'field' => $field_2->id]);
        
        $this->seeStatusCode(200)
        ->seeJsonEquals([
        "demoted" => true,
        "data" => [
        "id" => $ad_type->id,
        "field" => $field_2->id,
        "sequence" => 3
        ]
        ]);
        
        
        $this->post('/get_fields', ['id' => $ad_type->id]);
        
        $data = json_decode($this->response->getContent(), true)['data'];
        
        $this->assertEquals(4, sizeof($data));
        $this->assertEquals($field_1->id, $data[0]['id']);
        $this->assertEquals($field_3->id, $data[1]['id']);
        $this->assertEquals($field_2->id, $data[2]['id']);
        $this->assertEquals($field_4->id, $data[3]['id']);
        $this->assertEquals(1, $data[0]['pivot']['sequence']);
        $this->assertEquals(2, $data[1]['pivot']['sequence']);
        $this->assertEquals(3, $data[2]['pivot']['sequence']);
        $this->assertEquals(4, $data[3]['pivot']['sequence']);
        
    }
    
}