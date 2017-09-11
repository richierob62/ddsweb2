import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
	list: [],
	first_index: 0,
	list_dirty: true,
	page_title: 'Source Books',
	action_word: 'SourceBook',
	reducer_name: 'source_books',
	selected_id: -1,
	current_sort: {
		field_name: 'name',
		direction: 'ASC'
	},
	current_filters: {},
	mode: 'display',
	fields: {
		name: {
			label: 'Name',
			input_type: 'text',
			ref_table: undefined
		},
		code: {
			label: 'Code',
			input_type: 'text',
			ref_table: undefined
		},
		yppa_num: {
			label: 'YPPA #',
			input_type: 'text',
			ref_table: undefined
		},
		pub_month: {
			label: 'Publish Date',
			input_type: 'date',
			ref_table: undefined
		},
		sales_start: {
			label: 'Sales Start',
			input_type: 'date',
			ref_table: undefined
		},
		sales_close: {
			label: 'Sales Close',
			input_type: 'date',
			ref_table: undefined
		}
	},
	list_template: [
		{ field_name: 'code', width: '10%' },
		{ field_name: 'name', width: '30%' },
		{ field_name: 'yppa_num', width: '15%' },
		{ field_name: 'pub_month', width: '15%' },
		{ field_name: 'sales_start', width: '15%' },
		{ field_name: 'sales_close', width: '15%' }
	],
	details_template: {
		current_tab: '',
		tabs: [
			{
				name: '',
				rows: [ [ 'code', 'name' ], [ 'yppa_num' ], [ 'pub_month' ], [ 'sales_start', 'sales_close' ] ]
			}
		]
	},
	context_menu: [],
	ref_list: [],
	ref_list_dirty: true,
	typeahead: ''
})

export default initial_state
