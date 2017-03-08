<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CustomersTableSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        DB::table('customers')->insert([
        'id' =>  1,
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
        'other_1' =>  1,
        'other_2' =>  '2017-01-15',
        'outreach_locations' =>  'Outreach_Locations 1912',
        'pay_plan' =>  1,
        'primary_book' =>  6,
        'residency' =>  'Residency 2331',
        'room_num' =>  'Room_Num 4797',
        'special_interest' =>  'Special_Interest 4597',
        'undergraduate_education' =>  'Undergraduate_Education 1619',
        'website' =>  'Website 4376',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
        ]);
        
        DB::table('customers')->insert([
        'id' =>  2,
        'name' =>  'Adobe Systems',
        'address' =>  '121 NW. Indian Spring Street ',
        'city' =>  'Lebanon',
        'state' =>  'PA',
        'zip' =>  '17042',
        'area' =>  '664',
        'phone' =>  '810-1662',
        'account_num' =>  '4130144',
        'sales_rep' =>  7,
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
        'category' =>  9,
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
        'local_foreign' =>  3,
        'medical_director' =>  'Medical_Director 1895',
        'medical_education' =>  'Medical_Education 1137',
        'other_1' =>  1,
        'other_2' =>  '2017-01-15',
        'outreach_locations' =>  'Outreach_Locations 1912',
        'pay_plan' =>  9,
        'primary_book' =>  2,
        'residency' =>  'Residency 2331',
        'room_num' =>  'Room_Num 4797',
        'special_interest' =>  'Special_Interest 4597',
        'undergraduate_education' =>  'Undergraduate_Education 1619',
        'website' =>  'Website 4376',
        'created_at' => Carbon::now(),
        'updated_at' =>Carbon::now()
        ]);
    }
}