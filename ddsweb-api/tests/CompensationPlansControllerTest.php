<?php

use Laravel\Lumen\Testing\DatabaseMigrations;

class CompensationPlansControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setup()
    {
        parent::setup();
    }

    /** @test **/
    public function index_status_code_should_be_200()
    {
        factory(App\CompensationPlan::class, 3)->create();
        $this
            ->post('/compensation_plans')
            ->seeStatusCode(200);
    }

    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        factory(App\CompensationPlan::class, 3)->create();
        $this->post('/compensation_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $expected = [
            'data' => $data,
        ];

        $this->seeJsonEquals($expected);
    }

    /** @test **/
    public function index_should_return_a_reference_list()
    {
        factory(App\CompensationPlan::class, 3)->create();
        $this->post('/compensation_plan_reference');
        $data = json_decode($this->response->getContent(), true);
        $this->seeJsonEquals($data);
    }

    /** @test **/
    public function index_should_return_a_collection_of_filtered_and_ordered__records()
    {

        factory(App\CompensationPlan::class, 6)->create();
        $compensation_plan = factory(App\CompensationPlan::class)->create()->toArray();
        $compensation_plan['name'] = '0000something-123name-something';
        $compensation_plan['code'] = '0000something-123code';
        $this->post('/edit_compensation_plan', $compensation_plan);

        $this->post('/compensation_plans', [
            'filters' => [
                'name' => '123name',
                'code' => '123code',
                'id' => $compensation_plan['id'],
            ],
            'sort_name' => 'name',
            'sort_dir' => 'desc',
        ]);

        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(1, sizeOf($data));

        $this->post('/compensation_plans', [
            'filters' => [],
            'sort_name' => null,
            'sort_dir' => null,
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));

        $this->post('/compensation_plans', [
            'filters' => [],
            'sort_name' => 'name',
            'sort_dir' => 'asc',
        ]);
        $data = json_decode($this->response->getContent(), true)['data'];
        $first_rec = $data[0];
        $this->assertEquals($first_rec['name'], $compensation_plan['name']);

        $this->post('/compensation_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $this->assertEquals(7, sizeOf($data));

    }

    /** @test **/
    public function it_returns_a_valid_compensation_plan()
    {
        factory(App\CompensationPlan::class)->create();
        $this->post('/compensation_plans');
        $data = json_decode($this->response->getContent(), true)['data'];
        $id = $data[0]['id'];

        $expected = [
            'data' => $data[0],
        ];
        $this
            ->post('/compensation_plan', ['id' => $id])
            ->seeStatusCode(200)
            ->seeJsonEquals($expected);

        $data = json_decode($this->response->getContent(), true)['data'];

        $this->assertArrayhasKey('created_at', $data);
        $this->assertArrayhasKey('updated_at', $data);

    }

    /** @test **/
    public function returns_an_error_when_the_compensation_plan_id_does_not_exist()
    {
        $this
            ->post('/compensation_plan', ['id' => 999999])
            ->seeStatusCode(200)
            ->seeJson(['errors' => ['Not Found']]);
    }

    /** @test **/
    public function it_saves_new_compensation_plan_in_the_database()
    {

        $this->post('/new_compensation_plan', [
            'name' => 'foo',
            'code' => 'foo',
        ]);

        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);

        $data = $body['data'];
        $this->assertEquals('foo', $data['name']);
        $this->assertEquals('foo', $data['code']);
        $this->assertTrue($data['id'] > 0);

        $this
            ->seeStatusCode(200)
            ->seeJson(['created' => true])
            ->seeInDatabase('compensation_plans', [
                'name' => 'foo',
                'code' => 'foo',
            ]);

    }

    /** @test **/
    public function update_should_pass_with_a_valid_id()
    {
        $compensation_plan = factory(App\CompensationPlan::class)->create();

        $id = $compensation_plan->id;

        $this->post('/edit_compensation_plan', [
            'id' => $compensation_plan->id,
            'name' => 'foo_edited',
            'code' => 'foo_edited',
        ]);

        $body = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('data', $body);

        $this
            ->seeStatusCode(200)
            ->seeJson(['updated' => true, 'id' => $id])
            ->seeInDatabase('compensation_plans', ['name' => 'foo_edited']);

    }

    /** @test **/
    public function update_should_fail_with_an_invalid_id()
    {

        $this->post('/edit_compensation_plan', [
            'id' => 9999999,
            'name' => 'foo_edited',
            'code' => 'foo_edited',
        ]);

        $this
            ->seeStatusCode(200)
            ->seeJson(['errors' => ['Not Found']]);
    }

    /** @test **/
    public function delete_should_remove_a_valid_compensation_plan()
    {
        $compensation_plan = factory(App\CompensationPlan::class)->create();

        $id = $compensation_plan->id;

        $this->seeInDatabase('compensation_plans', ['id' => $id]);

        $this
            ->post('/delete_compensation_plan', ['id' => $id])
            ->seeStatusCode(200)
            ->seeJson(['deleted' => true]);

        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayhasKey('id', $data);

        $this->notSeeInDatabase('compensation_plans', ['id' => $id]);
    }

    /** @test **/
    public function delete_should_fail_with_an_invalid_id()
    {
        $this->post('/delete_compensation_plan', ['id' => 999999]);

        $this
            ->seeStatusCode(200)
            ->seeJson(['errors' => ['Not Found']]);
    }

    /** @test **/
    public function delete_should_fail_if_id_in_use()
    {
        $compensation_plan = factory(App\CompensationPlan::class)->create();

        $sales_rep = factory(App\SalesRep::class)->raw();
        $sales_rep['compensation_plan_id'] = $compensation_plan->id;
        $this->post('/new_sales_rep', $sales_rep);

        $this
            ->post('/delete_compensation_plan', ['id' => $compensation_plan->id])
            ->seeStatusCode(200)
            ->seeJson(['errors' => ['Cannot be deleted: It is being used']]);
    }

    // required - create
    /** @test **/
    public function it_validates_required_fields_when_creating_a_new_compensation_plan()
    {
        $this->post('/new_compensation_plan', [], ['Accept' => 'application/json']);

        $this->assertEquals(200, $this->response->getStatusCode());

        $errors = json_decode($this->response->getContent(), true)['errors'];

        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);

        $this->assertEquals("A compensation plan name is required.", $errors['name']);
        $this->assertEquals("A compensation plan code is required.", $errors['code']);

    }

    // required - edit
    /** @test **/
    public function it_validates_required_fields_when_updating_a_compensation_plan()
    {

        $compensation_plan = factory(App\CompensationPlan::class)->create();

        $this->post('/edit_compensation_plan', ['id' => $compensation_plan->id], ['Accept' => 'application/json']);

        $this->assertEquals(200, $this->response->getStatusCode());

        $errors = json_decode($this->response->getContent(), true)['errors'];

        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('code', $errors);

        $this->assertEquals("A compensation plan name is required.", $errors['name']);
        $this->assertEquals("A compensation plan code is required.", $errors['code']);

    }

    // unique - create
    /** @test **/
    public function it_rejects_duplicate_data_on_create()
    {

        $this->post('/new_compensation_plan', [
            'code' => 'foo',
            'name' => 'foo',
        ]);

        $this->post('/new_compensation_plan', [
            'code' => 'foo',
            'name' => 'foo',
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

        $compensation_plan_1 = factory(App\CompensationPlan::class)->create();

        $compensation_plan_2 = factory(App\CompensationPlan::class)->create();

        $this->post('/edit_compensation_plan', [
            'id' => $compensation_plan_2->id,
            'name' => $compensation_plan_1->name,
            'code' => $compensation_plan_1->code,
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

}
