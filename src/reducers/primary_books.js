import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
	list: [],
	first_index: 0,
	list_dirty: true,
	page_title: 'Primary Books',
	action_word: 'PrimaryBook',
	reducer_name: 'primary_books',
	selected_id: -1,
	current_sort: {
		field_name: 'name',
		direction: 'ASC'
	},
	current_filters: {},
	mode: 'display',
	fields: {
		code: {
			label: 'Code',
			input_type: 'text',
			ref_table: undefined
		},
		name: {
			label: 'Name',
			input_type: 'text',
			ref_table: undefined
		},
	},
	list_template: [
		{ field_name: 'code', width: '20%' },
		{ field_name: 'name', width: '30%' },
	],
	details_template: {
		current_tab: 'Main',
		tabs: [
			{
				name: 'Main',
				rows: [ [ 'code' ], [ 'name' ] ]
			}
		]
	},
	context_menu: [
    ],
    ref_list: [],
    ref_list_dirty: true,
    typeahead: ""
})

export default initial_state
