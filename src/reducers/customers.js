import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        {
            id: 1, name: 'L\'Oréal', address: '10 Leeton Ridge Ave. ', city: 'Wisconsin Rapids', state: 'WI', zip: '54494', area: '494', phone: '487-8119', account_num: '4041234', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 2, name: 'Adobe Systems', address: '121 NW. Indian Spring Street ', city: 'Lebanon', state: 'PA', zip: '17042', area: '664', phone: '810-1662', account_num: '4130144', sales_rep: 7, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 9, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 3, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 3, name: 'Allianz', address: '164 Depot Ave. ', city: 'North Ridgeville', state: 'OH', zip: '44039', area: '440', phone: '215-4916', account_num: '9842555', sales_rep: 9, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 3, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 7, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 4, name: 'Amazon.com', address: '2 Kirkland St. ', city: 'Matawan', state: 'NJ', zip: '7747', area: '601', phone: '777-4414', account_num: '1028587', sales_rep: 4, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 1, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 5, name: 'American Express', address: '204 East Ryan St. ', city: 'Braintree', state: 'MA', zip: '2184', area: '517', phone: '185-6539', account_num: '8652533', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 8, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 8, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 1, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 6, name: 'AT&T', address: '251 Shub Farm Drive ', city: 'Huntington Station', state: 'NY', zip: '11746', area: '419', phone: '616-9065', account_num: '4816950', sales_rep: 9, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 2, primary_book: 8, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 7, name: 'Bank of America', address: '28 River St. ', city: 'Arlington Heights', state: 'IL', zip: '60004', area: '144', phone: '878-8165', account_num: '5828729', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 3, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 8, name: 'Budweiser Stag Brewing Company', address: '29 Grant St. ', city: 'Hicksville', state: 'NY', zip: '11801', area: '601', phone: '750-8542', account_num: '4467658', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 9, name: 'Caterpillar Inc.', address: '3 Country Court ', city: 'Bismarck', state: 'ND', zip: '58501', area: '340', phone: '671-3497', account_num: '1981765', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 2, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 5, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 10, name: 'Chase', address: '30 Brook Ave. ', city: 'Waterford', state: 'MI', zip: '48329', area: '587', phone: '596-6468', account_num: '6702723', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 9, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 11, name: 'Cisco Systems, Inc.', address: '313 Paris Hill Road ', city: 'Skokie', state: 'IL', zip: '60076', area: '386', phone: '962-4376', account_num: '8145803', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 1, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 5, primary_book: 10, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 12, name: 'Citigroup', address: '353 Washington Ave. ', city: 'Trenton', state: 'NJ', zip: '8610', area: '452', phone: '543-4590', account_num: '9347709', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 7, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 13, name: 'Coca-Cola', address: '355 Andover Court ', city: 'Saint Paul', state: 'MN', zip: '55104', area: '175', phone: '150-0787', account_num: '8712262', sales_rep: 4, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 3, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 5, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 14, name: 'Corona', address: '4 Buckingham Road ', city: 'Vicksburg', state: 'MS', zip: '39180', area: '157', phone: '380-6555', account_num: '5465816', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 7, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 3, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 4, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 15, name: 'Credit Suisse', address: '40 Glenridge Street ', city: 'North Tonawanda', state: 'NY', zip: '14120', area: '664', phone: '519-7267', account_num: '5252587', sales_rep: 7, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 6, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 1, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 16, name: 'Deere & Company', address: '429 Fairfield St. ', city: 'Urbandale', state: 'IA', zip: '50322', area: '879', phone: '131-0370', account_num: '2504981', sales_rep: 9, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 3, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 17, name: 'eBay', address: '43 Thorne Dr. ', city: 'Tampa', state: 'FL', zip: '33604', area: '244', phone: '569-9699', account_num: '2988422', sales_rep: 7, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 1, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 18, name: 'Global Gillette', address: '45 Essex Drive ', city: 'Collegeville', state: 'PA', zip: '19426', area: '826', phone: '860-7829', account_num: '1288369', sales_rep: 9, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 8, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 2, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 4, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 19, name: 'Harley-Davidson Motor Company', address: '471 Lake Forest St. ', city: 'Warwick', state: 'RI', zip: '2886', area: '577', phone: '835-2499', account_num: '5040201', sales_rep: 7, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 9, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 7, primary_book: 4, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 20, name: 'Hermès', address: '51 Oakwood Lane ', city: 'Kansas City', state: 'MO', zip: '64151', area: '704', phone: '170-7774', account_num: '9216443', sales_rep: 6, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 8, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 21, name: 'Hewlett-Packard', address: '520 Wayne Street ', city: 'Buford', state: 'GA', zip: '30518', area: '527', phone: '940-8976', account_num: '1427848', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 3, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 22, name: 'Home Depot', address: '544 Hillcrest Street ', city: 'Palos Verdes Peninsula', state: 'CA', zip: '90274', area: '811', phone: '718-4893', account_num: '5679667', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 23, name: 'IBM', address: '6 S. Ohio Street ', city: 'Trumbull', state: 'CT', zip: '6611', area: '377', phone: '749-5649', account_num: '2006699', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 1, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 9, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 24, name: 'Intel Corporation', address: '615 South Newbridge Drive ', city: 'West Bloomfield', state: 'MI', zip: '48322', area: '319', phone: '834-5315', account_num: '5835848', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 8, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 5, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 7, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 25, name: 'Jack Daniel\'s', address: '620 Golden Star St. ', city: 'Mundelein', state: 'IL', zip: '60060', area: '770', phone: '869-2784', account_num: '5677722', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 8, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 7, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 3, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 26, name: 'Johnnie Walker', address: '72 Cross St. ', city: 'Newburgh', state: 'NY', zip: '12550', area: '194', phone: '345-7191', account_num: '9823346', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 2, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 9, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 7, primary_book: 8, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 27, name: 'KFC', address: '7310 Orange Drive ', city: 'Oshkosh', state: 'WI', zip: '54901', area: '705', phone: '497-0049', account_num: '5679108', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 1, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 1, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 28, name: 'MasterCard', address: '7399 Bridgeton Ave. ', city: 'Danbury', state: 'CT', zip: '6810', area: '648', phone: '617-4166', account_num: '7992192', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 2, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 10, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 29, name: 'McDonald\'s', address: '74 Clinton Ave. ', city: 'Owensboro', state: 'KY', zip: '42301', area: '826', phone: '928-7002', account_num: '3380707', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 7, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 30, name: 'Mercedes-Benz', address: '74 Ramblewood Ave. ', city: 'Lanham', state: 'MD', zip: '20706', area: '270', phone: '934-0454', account_num: '5339897', sales_rep: 2, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 5, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 5, primary_book: 4, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 31, name: 'Microsoft', address: '7480 Santa Clara St. ', city: 'North Kingstown', state: 'RI', zip: '2852', area: '261', phone: '199-2631', account_num: '5260880', sales_rep: 8, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 7, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 8, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 32, name: 'Moët et Chandon', address: '7517 High Noon Street ', city: 'Danvers', state: 'MA', zip: '1923', area: '409', phone: '428-6706', account_num: '7358127', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 33, name: 'Nintendo', address: '759 Tarkiln Hill Street ', city: 'San Lorenzo', state: 'CA', zip: '94580', area: '425', phone: '895-0818', account_num: '5358787', sales_rep: 5, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 9, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 34, name: 'Nissan Motor Co., Ltd.', address: '77 Saxon Drive ', city: 'Floral Park', state: 'NY', zip: '11001', area: '695', phone: '754-6120', account_num: '8372416', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 35, name: 'Nokia', address: '7748 Buckingham Street ', city: 'Fremont', state: 'OH', zip: '43420', area: '971', phone: '680-1133', account_num: '7893213', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 9, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 8, primary_book: 3, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 36, name: 'NTT Data', address: '787 Hawthorne St. ', city: 'Danville', state: 'VA', zip: '24540', area: '600', phone: '321-3720', account_num: '2145343', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 7, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 8, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 37, name: 'Pampers', address: '7898 Redwood Drive ', city: 'Columbia', state: 'MD', zip: '21044', area: '663', phone: '389-6517', account_num: '6607691', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 5, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 38, name: 'Porsche', address: '7940 Vale Avenue ', city: 'York', state: 'PA', zip: '17402', area: '788', phone: '130-8139', account_num: '3074615', sales_rep: 9, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 9, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 1, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 2, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 39, name: 'Prada', address: '8 Fawn Avenue ', city: 'Londonderry', state: 'NH', zip: '3053', area: '471', phone: '265-6066', account_num: '2508625', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 1, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 40, name: 'Ralph Lauren Corporation', address: '80 Bayport Lane ', city: 'South El Monte', state: 'CA', zip: '91733', area: '149', phone: '261-2423', account_num: '7812640', sales_rep: 10, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 8, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 8, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 41, name: 'Siemens AG', address: '8303 Buckingham Street ', city: 'Bozeman', state: 'MT', zip: '59715', area: '756', phone: '812-9276', account_num: '3239194', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 8, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 2, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 42, name: 'Smirnoff', address: '861 Jones Rd. ', city: 'New Brunswick', state: 'NJ', zip: '8901', area: '422', phone: '154-0927', account_num: '4347061', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 10, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 43, name: 'Sony', address: '8936 Joy Ridge Circle ', city: 'Glendale Heights', state: 'IL', zip: '60139', area: '301', phone: '702-9390', account_num: '5396336', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 7, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 4, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 9, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 44, name: 'Sprite', address: '9 N. Wayne Drive ', city: 'Sandusky', state: 'OH', zip: '44870', area: '417', phone: '582-9423', account_num: '1615106', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 2, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 10, primary_book: 6, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 45, name: 'Tiffany & Co.', address: '916 Mayflower St. ', city: 'Vienna', state: 'VA', zip: '22180', area: '972', phone: '489-1680', account_num: '6714269', sales_rep: 7, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 5, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 6, primary_book: 2, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 46, name: 'United Parcel Service', address: '9377 Catherine Ave. ', city: 'Elizabethtown', state: 'PA', zip: '17022', area: '906', phone: '702-7893', account_num: '9299734', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 4, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 1, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 47, name: 'Verizon Communications', address: '9402 W. Ohio St. ', city: 'Colonial Heights', state: 'VA', zip: '23834', area: '800', phone: '356-1100', account_num: '8559141', sales_rep: 4, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 9, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 48, name: 'Vodafone', address: '9429 Arnold Drive ', city: 'Highland Park', state: 'IL', zip: '60035', area: '758', phone: '747-0954', account_num: '2512935', sales_rep: 6, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 3, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 10, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 4, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 49, name: 'Wal-Mart', address: '9519 Arnold St. ', city: 'Highland Park', state: 'IL', zip: '60035', area: '463', phone: '462-7023', account_num: '1500730', sales_rep: 3, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 2, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 2, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 3, primary_book: 7, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        },
        {
            id: 50, name: 'Yahoo!', address: '970 Pine St. ', city: 'Centreville', state: 'VA', zip: '20120', area: '139', phone: '865-2178', account_num: '9283560', sales_rep: 1, advanced_training: 'Advanced_Training 4749', affiliated_clinics: 'Affiliated_Clinics 2236', affiliated_networks: 'Affiliated_Networks 1119', billing_address: 'Billing_Address 2889', billing_area: 'Billing_Area 2938', billing_city: 'Billing_City 2616', billing_contact: 'Billing_Contact 3957', billing_email: 'Billing_Email 2744', billing_name: 'Billing_Name 2911', billing_phone: 'Billing_Phone 3725', billing_state: 'Billing_State 2194', billing_zip: 'Billing_Zip 2843', building: 'Building 2482', category: 5, certification: 'Certification 3398', department: 'Department 4303', director: 'Director 1045', email: 'Email 2481', entered_public_practice: 'Entered_Public_Practice 3135', fax_area: 'Fax_Area 4896', fax_phone: 'Fax_Phone 3601', fellowship: 'Fellowship 2353', hospital_affiliations: 'Hospital_Affiliations 3135', hours: 'Hours 2780', local_foreign: 6, medical_director: 'Medical_Director 1895', medical_education: 'Medical_Education 1137', other_1: 1, other_2: '2017-01-15', outreach_locations: 'Outreach_Locations 1912', pay_plan: 5, primary_book: 5, residency: 'Residency 2331', room_num: 'Room_Num 4797', special_interest: 'Special_Interest 4597', undergraduate_education: 'Undergraduate_Education 1619', website: 'Website 4376'
        }
    ],
    page_title: 'Customers',
    action_word: 'Customer',
    selected_id: -1,
    current_sort: {
        field_name: 'name',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'account_num', label: 'Acc #', input_type: 'text', ref_table: undefined, readonly: true },
        { field_name: 'address', label: 'Address', input_type: 'text', ref_table: undefined },
        { field_name: 'advanced_training', label: 'Adv Training', input_type: 'text', ref_table: undefined },
        { field_name: 'affiliated_clinics', label: 'Affil Clinics', input_type: 'text', ref_table: undefined },
        { field_name: 'affiliated_networks', label: 'Affil Networks', input_type: 'text', ref_table: undefined },
        { field_name: 'area', label: 'Area', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_address', label: 'Billing Address', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_area', label: 'Billing Area', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_city', label: 'Billing City', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_contact', label: 'Billing Contact', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_email', label: 'Billing Email', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_name', label: 'Billing Name', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_phone', label: 'Billing Phone', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_state', label: 'Billing State', input_type: 'text', ref_table: undefined },
        { field_name: 'billing_zip', label: 'Billing Zip', input_type: 'text', ref_table: undefined },
        { field_name: 'building', label: 'Building', input_type: 'text', ref_table: undefined },
        { field_name: 'category', label: 'Category', input_type: 'select', ref_table: 'category' },
        { field_name: 'certification', label: 'Certification', input_type: 'text', ref_table: undefined },
        { field_name: 'city', label: 'City', input_type: 'text', ref_table: undefined },
        { field_name: 'department', label: 'Department', input_type: 'text', ref_table: undefined },
        { field_name: 'director', label: 'Director', input_type: 'text', ref_table: undefined },
        { field_name: 'email', label: 'Email', input_type: 'text', ref_table: undefined },
        { field_name: 'entered_public_practice', label: 'Ent Pub Prctce', input_type: 'text', ref_table: undefined },
        { field_name: 'fax_area', label: 'Fax Area', input_type: 'text', ref_table: undefined },
        { field_name: 'fax_phone', label: 'Fax Phone', input_type: 'text', ref_table: undefined },
        { field_name: 'fellowship', label: 'Fellowship', input_type: 'text', ref_table: undefined },
        { field_name: 'hospital_affiliations', label: 'Hospital Affil', input_type: 'text', ref_table: undefined },
        { field_name: 'hours', label: 'Hours', input_type: 'text', ref_table: undefined },
        { field_name: 'local_foreign', label: 'Local Foreign', input_type: 'select', ref_table: 'local_foreign' },
        { field_name: 'medical_director', label: 'Medical Dir', input_type: 'text', ref_table: undefined },
        { field_name: 'medical_education', label: 'Medical Educ', input_type: 'text', ref_table: undefined },
        { field_name: 'name', label: 'Name', input_type: 'text', ref_table: undefined },
        { field_name: 'other_1', label: 'Other 1', input_type: 'radio', ref_table: undefined },
        { field_name: 'other_2', label: 'Other 2', input_type: 'date', ref_table: undefined },
        { field_name: 'outreach_locations', label: 'Outrch Locns', input_type: 'text', ref_table: undefined },
        { field_name: 'pay_plan', label: 'Pay Plan', input_type: 'select', ref_table: 'pay_plan' },
        { field_name: 'phone', label: 'Phone', input_type: 'text', ref_table: undefined },
        { field_name: 'primary_book', label: 'Primary Book', input_type: 'select', ref_table: 'primary_book' },
        { field_name: 'residency', label: 'Residency', input_type: 'text', ref_table: undefined },
        { field_name: 'room_num', label: 'Room Number', input_type: 'text', ref_table: undefined },
        { field_name: 'sales_rep', label: 'Sales Rep', input_type: 'typeahead', ref_table: 'sales_rep' },
        { field_name: 'special_interest', label: 'Special Int', input_type: 'checkbox', ref_table: undefined },
        { field_name: 'state', label: 'State', input_type: 'text', ref_table: undefined },
        { field_name: 'undergraduate_education', label: 'Undergrad Ed', input_type: 'text', ref_table: undefined },
        { field_name: 'website', label: 'Website', input_type: 'text', ref_table: undefined },
        { field_name: 'zip', label: 'Zip', input_type: 'text', ref_table: undefined }
    ],
    list_template: [
        { field_name: 'name', width: '26%' },
        { field_name: 'address', width: '24%' },
        { field_name: 'city', width: '18%' },
        { field_name: 'state', width: '6%' },
        { field_name: 'account_num', width: '10%' },
        { field_name: 'sales_rep', width: '15%' }
    ],
    details_template: {
        current_tab: 'Contact Info',
        tabs: [
            {
                name: 'Contact Info',
                rows: [
                    ['name'],
                    ['address', 'city'],
                    ['state', 'zip'],
                    ['area', 'fax_area'],
                    ['phone', 'fax_phone'],
                    ['email'],
                    ['website'],
                ]
            },
            {
                name: 'Billing Info',
                rows: [
                    ['billing_name'],
                    ['billing_address', 'billing_city'],
                    ['billing_state', 'billing_zip'],
                    ['billing_contact'],
                    ['billing_area', 'billing_email'],
                    ['billing_phone']
                ]
            },
            {
                name: 'Classification',
                rows: [
                    ['account_num', 'sales_rep'],
                    ['local_foreign', 'pay_plan'],
                    ['primary_book', 'category']
                ]
            },
            {
                name: 'Credentials',
                rows: [
                    ['building', 'department', 'room_num'],
                    ['hours', 'hospital_affiliations', 'special_interest'],
                    ['medical_education', 'undergraduate_education', 'certification'],
                    ['fellowship', 'residency', 'advanced_training'],
                    ['entered_public_practice', 'outreach_locations', 'affiliated_clinics'],
                    ['medical_director', 'director', 'affiliated_networks'],
                    ['other_1', 'other_2']
                ]
            }
        ]
    },
    context_menu: [
        { label: 'Orders', link: 'orders', filter_on: 'account_num', select_on: undefined },
        { label: 'Primary Book', link: 'primary_books', filter_on: undefined, select_on: 'primary_book' },
        { label: 'Sales Rep', link: 'sales_reps', filter_on: undefined, select_on: 'sales_rep' },
    ],
    radio_groups: [
        {
            field_name: 'other_1',
            options: [
                { id: 1, display: 'option 1' },
                { id: 2, display: 'option 2' },
            ]
        },
    ]
})

const customers = (state = initial_state, action) => {
    switch (action.type) {

        // select 
        case 'SELECT_CUSTOMER': {
            if (state.get('mode') !== 'display') return state
            return state.set('selected_id', action.payload)
        }
        case 'SELECT_CUSTOMER_TAB': {
            return state.setIn(['details_template', 'current_tab'], action.payload)
        }

        // sort
        case 'CHANGE_CUSTOMER_SORT': {
            const sorted_on = state.getIn(['current_sort', 'field_name'])
            const sorted_dir = state.getIn(['current_sort', 'direction'])
            const new_direction = action.payload === sorted_on
                ? (sorted_dir === 'ASC'
                    ? 'DESC'
                    : 'ASC')
                : 'ASC'
            return state.setIn(['current_sort', 'field_name'], action.payload)
                .setIn(['current_sort', 'direction'], new_direction)
        }

        // filter
        case 'CHANGE_CUSTOMER_FILTER': {
            return state.setIn(['current_filters', action.payload.column], action.payload.value)
        }

        // editing
        case 'CHANGE_CUSTOMER_DATA': {
            return state.updateIn(
                ['list'],
                list => {
                    return list.update(
                        list.findIndex(item => {
                            return item.get('id') === state.get('selected_id')
                        }),
                        item => {
                            return item.set(action.payload.field, action.payload.value);
                        }
                    )
                }
            )
        }

        // change mode
        case 'BEGIN_CUSTOMER_EDIT': {
            const id = state.get('selected_id')
            const current = state.get('list').find(cust => cust.get('id') === id)
            const backup_copy = Object.assign({}, current.toJS())
            return state.set('mode', 'edit')
                .set('backup_copy', backup_copy)
        }
        case 'BEGIN_CUSTOMER_CREATE': {
            const id = Math.floor(Math.random() * 1000000 + 1000000)
            const new_copy = state.get('fields')
                .toJS()
                .reduce((acc, field) => {
                    if (field.ref_table !== undefined) return Object.assign({}, acc, { [field.field_name]: undefined })
                    if (field.input_type === 'radio') return Object.assign({}, acc, { [field.field_name]: 1 })
                    if (field.input_type === 'date') return Object.assign({}, acc, { [field.field_name]: undefined })
                    return Object.assign({}, acc, { [field.field_name]: '' })
                }, { id: id })
            return state.updateIn(
                ['list'],
                list => list.push(Immutable.fromJS(new_copy))
            )
                .set('selected_id', id)
                .set('mode', 'new')
        }
        case 'BEGIN_CUSTOMER_DUPLICATE': {
            const new_id = Math.floor(Math.random() * 1000000 + 1000000)
            const id = state.get('selected_id')
            const current = state.get('list').find(item => item.get('id') === id)
                .toJS()
            const new_copy = Object.assign({}, current, { id: new_id, account_num: '' })
            return state.updateIn(
                ['list'],
                list => list.push(Immutable.fromJS(new_copy))
            )
                .set('selected_id', new_id)
                .set('mode', 'duplicate')
        }
        case 'BEGIN_CUSTOMER_DELETE': {
            return state.set('mode', 'deleting')
        }

        // In sagas we will fire following events after persisting
        case 'SAVE_EDITED_CUSTOMER_DONE': {
            return state.set('mode', 'display').set('backup_copy', undefined)
        }
        case 'SAVE_NEW_CUSTOMER_DONE':
        case 'SAVE_DUPLICATE_CUSTOMER_DONE': {
            const temp_id = state.get('selected_id')
            const index = state.get('list').findIndex(item => item.get('id') === temp_id)
            const current = state.get('list')
                .find(item => item.get('id') === temp_id)
                .set('id', action.payload.id)
                .set('account_num', action.payload.account_num)
            return state.updateIn(
                ['list'],
                list => list.set(index, current)
            )
                .set('mode', 'display')
                .set('selected_id', action.payload)
        }
        case 'DELETE_CUSTOMER_DONE': {
            const id = state.get('selected_id')
            const index = state.get('list').findIndex(item => item.get('id') === id)
            return state.updateIn(
                ['list'],
                list => list.delete(index)
            )
                .set('mode', 'display')
                .set('selected_id', -1)
        }

        // cancel by mode
        case 'CANCEL_CUSTOMER': {
            const mode = state.get('mode')
            switch (mode) {
                // edit
                case 'edit': {
                    const temp_id = state.get('selected_id')
                    const index = state.get('list').findIndex(item => item.get('id') === temp_id)
                    const backup_copy = state.get('backup_copy')
                    return state.updateIn(
                        ['list'],
                        list => list.set(index, backup_copy)
                    )
                        .set('mode', 'display')
                        .set('backup_copy', undefined)
                }
                // new
                // duplicate
                case 'new':
                case 'duplicate': {
                    const id = state.get('selected_id')
                    const index = state.get('list').findIndex(item => item.get('id') === id)
                    return state.updateIn(
                        ['list'],
                        list => list.delete(index)
                    )
                        .set('mode', 'display')
                        .set('selected_id', -1)
                }
                // delete
                case 'delete': {
                    return state.set('mode', 'display')
                }
                default: return state
            }
        }
        
        default: return state
    }
}

export default customers