import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Heading name 1', sort_name: 'heading1', page_type: 1, heading_num: 900 },
        { id: 2, name: 'Heading name 2', sort_name: 'heading2', page_type: 2, heading_num: 901 },
        { id: 3, name: 'Heading name 3', sort_name: 'heading3', page_type: 1, heading_num: 902 },
        { id: 4, name: 'Heading name 4', sort_name: 'heading4', page_type: 2, heading_num: 903 },
        { id: 5, name: 'Heading name 5', sort_name: 'heading5', page_type: 1, heading_num: 904 },
        { id: 6, name: 'Heading name 6', sort_name: 'heading6', page_type: 3, heading_num: 905 },
    ],
    page_title: 'Headings',
    action_word: 'Heading',
    selected_id: -1,
    current_sort: {
        field_name: 'name',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'name', label: 'Name', input_type: 'text', ref_table: undefined },
        { field_name: 'sort_name', label: 'Sort Name', input_type: 'text', ref_table: undefined },
        { field_name: 'heading_num', label: 'Heading Number', input_type: 'text', ref_table: undefined },
        { field_name: 'page_type', label: 'Page Type', input_type: 'select', ref_table: 'page_type' }
    ],
    list_template: [
        { field_name: 'heading_num', width: '20%' },
        { field_name: 'name', width: '30%' },
        { field_name: 'sort_name', width: '30%' },
        { field_name: 'page_type', width: '20%' }
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['heading_num'],
                    ['name'],
                    ['sort_name'],
                    ['page_type']
                ]
            }
        ]
    },
    context_menu: [],
    radio_groups: [],
    ref_list: [],
    typeahead: ''    
})

export default initial_state