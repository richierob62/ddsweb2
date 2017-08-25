import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
	list: [],
	first_index: 0,
	list_dirty: true,
	page_title: 'Customers',
	action_word: 'Customer',
	reducer_name: 'customers',
	selected_id: -1,
	current_sort: {
		field_name: 'name',
		direction: 'ASC'
	},
	current_filters: {},
	mode: 'display',
	fields: {
		account_num: {
			label: 'Acc #',
			input_type: 'text',
			ref_table: undefined,
			readonly: true
		},
		address: {
			label: 'Address',
			input_type: 'text',
			ref_table: undefined
		},
		advanced_training: {
			label: 'Adv Training',
			input_type: 'text',
			ref_table: undefined
		},
		affiliated_clinics: {
			label: 'Affil Clinics',
			input_type: 'text',
			ref_table: undefined
		},
		affiliated_networks: {
			label: 'Affil Networks',
			input_type: 'text',
			ref_table: undefined
		},
		area: {
			label: 'Area',
			input_type: 'text',
			ref_table: undefined
		},
		billing_address: {
			label: 'Billing Address',
			input_type: 'text',
			ref_table: undefined
		},
		billing_area: {
			label: 'Billing Area',
			input_type: 'text',
			ref_table: undefined
		},
		billing_city: {
			label: 'Billing City',
			input_type: 'text',
			ref_table: undefined
		},
		billing_contact: {
			label: 'Billing Contact',
			input_type: 'text',
			ref_table: undefined
		},
		billing_email: {
			label: 'Billing Email',
			input_type: 'text',
			ref_table: undefined
		},
		billing_name: {
			label: 'Billing Name',
			input_type: 'text',
			ref_table: undefined
		},
		billing_phone: {
			label: 'Billing Phone',
			input_type: 'text',
			ref_table: undefined
		},
		billing_state: {
			label: 'Billing State',
			input_type: 'text',
			ref_table: undefined
		},
		billing_zip: {
			label: 'Billing Zip',
			input_type: 'text',
			ref_table: undefined
		},
		building: {
			label: 'Building',
			input_type: 'text',
			ref_table: undefined
		},
		category: {
			label: 'Category',
			input_type: 'select',
			ref_table: 'category'
		},
		certification: {
			label: 'Certification',
			input_type: 'text',
			ref_table: undefined
		},
		city: {
			label: 'City',
			input_type: 'text',
			ref_table: undefined
		},
		department: {
			label: 'Department',
			input_type: 'text',
			ref_table: undefined
		},
		director: {
			label: 'Director',
			input_type: 'text',
			ref_table: undefined
		},
		email: {
			label: 'Email',
			input_type: 'text',
			ref_table: undefined
		},
		entered_public_practice: {
			label: 'Ent Pub Prctce',
			input_type: 'text',
			ref_table: undefined
		},
		fax_area: {
			label: 'Fax Area',
			input_type: 'text',
			ref_table: undefined
		},
		fax_phone: {
			label: 'Fax Phone',
			input_type: 'text',
			ref_table: undefined
		},
		fellowship: {
			label: 'Fellowship',
			input_type: 'text',
			ref_table: undefined
		},
		hospital_affiliations: {
			label: 'Hospital Affil',
			input_type: 'text',
			ref_table: undefined
		},
		hours: {
			label: 'Hours',
			input_type: 'text',
			ref_table: undefined
		},
		local_foreign: {
			label: 'Local Foreign',
			input_type: 'select',
			ref_table: 'local_foreign'
		},
		medical_director: {
			label: 'Medical Dir',
			input_type: 'text',
			ref_table: undefined
		},
		medical_education: {
			label: 'Medical Educ',
			input_type: 'text',
			ref_table: undefined
		},
		name: {
			label: 'Name',
			input_type: 'text',
			ref_table: undefined
		},
		other_1: {
			label: 'Other 1',
			input_type: 'radio',
			ref_table: undefined,
			options: [
				{
					id: 1,
					display: 'option 1'
				},
				{
					id: 2,
					display: 'option 2'
				}
			]
		},
		other_2: {
			label: 'Other 2',
			input_type: 'date',
			ref_table: undefined
		},
		outreach_locations: {
			label: 'Outrch Locns',
			input_type: 'text',
			ref_table: undefined
		},
		pay_plan: {
			label: 'Pay Plan',
			input_type: 'select',
			ref_table: 'pay_plan'
		},
		phone: {
			label: 'Phone',
			input_type: 'text',
			ref_table: undefined
		},
		primary_book: {
			label: 'Primary Book',
			input_type: 'select',
			ref_table: 'primary_book'
		},
		residency: {
			label: 'Residency',
			input_type: 'text',
			ref_table: undefined
		},
		room_num: {
			label: 'Room Number',
			input_type: 'text',
			ref_table: undefined
		},
		sales_rep: {
			label: 'Sales Rep',
			input_type: 'select',
			ref_table: 'sales_rep'
		},
		special_interest: {
			label: 'Special Int',
			input_type: 'checkbox',
			ref_table: undefined
		},
		state: {
			label: 'State',
			input_type: 'text',
			ref_table: undefined
		},
		undergraduate_education: {
			label: 'Undergrad Ed',
			input_type: 'text',
			ref_table: undefined
		},
		website: {
			label: 'Website',
			input_type: 'text',
			ref_table: undefined
		},
		zip: {
			label: 'Zip',
			input_type: 'text',
			ref_table: undefined
		}
	},
	list_template: [
		{ field_name: 'name', width: '26%' },
		{ field_name: 'address', width: '24%' },
		{ field_name: 'city', width: '16%' },
		{ field_name: 'state', width: '8%' },
		{ field_name: 'account_num', width: '10%' },
		{ field_name: 'sales_rep', width: '15%' }
	],
	details_template: {
		current_tab: 'Contact Info',
		tabs: [
			{
				name: 'Contact Info',
				rows: [
					[ 'name' ],
					[ 'address', 'city' ],
					[ 'state', 'zip' ],
					[ 'area', 'phone' ],
					[ 'fax_area', 'fax_phone' ],
					[ 'email', 'website' ]
				]
			},
			{
				name: 'Billing Info',
				rows: [
					[ 'billing_name' ],
					[ 'billing_address', 'billing_city' ],
					[ 'billing_state', 'billing_zip' ],
					[ 'billing_contact' ],
					[ 'billing_area', 'billing_phone' ],
					[ 'billing_email' ]
				]
			},
			{
				name: 'Classification',
				rows: [
					[ 'account_num', 'sales_rep' ],
					[ 'local_foreign', 'pay_plan' ],
					[ 'primary_book', 'category' ]
				]
			},
			{
				name: 'Credentials',
				rows: [
					[ 'building', 'department' ],
					[ 'room_num', 'hours' ],
					[ 'hospital_affiliations', 'special_interest' ],
					[ 'medical_education', 'undergraduate_education' ],
					[ 'certification', 'fellowship' ],
					[ 'residency', 'advanced_training' ],
					[ 'entered_public_practice', 'outreach_locations' ],
					[ 'affiliated_clinics', 'medical_director' ],
					[ 'director', 'affiliated_networks' ],
					[ 'other_1', 'other_2' ]
				]
			}
		]
	},
	context_menu: [
		{
			label: 'Orders',
			link: 'orders',
			filter_on: 'account_num',
			select_on: undefined
		},
		{
			label: 'Primary Book',
			link: 'primary_books',
			filter_on: undefined,
			select_on: 'primary_book'
		},
		{
			label: 'Sales Rep',
			link: 'sales_reps',
			filter_on: undefined,
			select_on: 'sales_rep'
		}
	],
	ref_list: [],
	ref_list_dirty: true,
	typeahead: ''
})

export default initial_state
