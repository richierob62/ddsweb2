<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class CustomersControllerTest extends TestCase
{
    /** @test **/
    public function index_status_code_should_be_200()
    {
        $this
        ->post('/customers', ['foo' => 'bar'])
        ->seeStatusCode(200);
    }
    
    /** @test **/
    public function index_should_return_a_collection_of_records()
    {
        $this
        ->post('/customers', ['foo' => 'bar'])
        ->seeJson([
        'name' => 'L\'Oreal'
        ])
        ->seeJson([
        'name' => 'Adobe Systems'
        ]);
    }
    
    /** @test **/
    public function show_should_return_a_valid_book()
    {
        // $this->markTestIncomplete('Pending test');
        $this
        ->post('/customer', ['id' => 1])
        ->seeStatusCode(200)
        ->seeJson([
        'id' => 1,
        'name' =>  'L\'Oreal',
        'address' =>  '10 Leeton Ridge Ave. ',
        'city' =>  'Wisconsin Rapids',
        'state' =>  'WI',
        'zip' =>  '54494',
        'area' =>  '494',
        'phone' =>  '487-8119',
        'account_num' =>  '4041234',
        'sales_rep' =>  5,
        'advanced_training' =>  'Advanced_Training 4749',
        'affiliated_clinics' =>  'Affiliated_Clinics 2236',
        'affiliated_networks' =>  'Affiliated_Networks 1119',
        'billing_address' =>  'Billing_Address 2889',
        'billing_area' =>  'Billing_Area 2938',
        'billing_city' =>  'Billing_City 2616',
        'billing_contact' =>  'Billing_Contact 3957',
        'billing_email' =>  'Billing_Email 2744',
        'billing_name' =>  'Billing_Name 2911',
        'billing_phone' =>  'Billing_Phone 3725',
        'billing_state' =>  'Billing_State 2194',
        'billing_zip' =>  'Billing_Zip 2843',
        'building' =>  'Building 2482',
        'category' =>  4,
        'certification' =>  'Certification 3398',
        'department' =>  'Department 4303',
        'director' =>  'Director 1045',
        'email' =>  'Email 2481',
        'entered_public_practice' =>  'Entered_Public_Practice 3135',
        'fax_area' =>  'Fax_Area 4896',
        'fax_phone' =>  'Fax_Phone 3601',
        'fellowship' =>  'Fellowship 2353',
        'hospital_affiliations' =>  'Hospital_Affiliations 3135',
        'hours' =>  'Hours 2780',
        'local_foreign' =>  4,
        'medical_director' =>  'Medical_Director 1895',
        'medical_education' =>  'Medical_Education 1137',
        'other_1' =>  '1',
        'other_2' =>  '2017-01-15',
        'outreach_locations' =>  'Outreach_Locations 1912',
        'pay_plan' =>  1,
        'primary_book' =>  6,
        'residency' =>  'Residency 2331',
        'room_num' =>  'Room_Num 4797',
        'special_interest' =>  'Special_Interest 4597',
        'undergraduate_education' =>  'Undergraduate_Education 1619',
        'website' =>  'Website 4376'
        ]);
        
        $data = json_decode($this->response->getContent(), true);
        $this->assertArrayHasKey('created_at', $data);
        $this->assertArrayHasKey('updated_at', $data);
    }
    
    /** @test **/
    public function show_should_fail_when_the_book_id_does_not_exist()
    {
        $this
        ->post('/customer', ['id' => 999999])
        ->seeStatusCode(404)
        ->seeJson(['error' => 'Not Found']);
    }
    
    /** @test **/
    public function show_route_should_not_match_an_invalid_route()
    {
        $this->markTestIncomplete('Pending test');
    }
    
}