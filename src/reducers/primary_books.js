import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Primary Book name 1', code: 'atc1' },
        { id: 2, name: 'Primary Book name 2', code: 'atc2' },
        { id: 3, name: 'Primary Book name 3', code: 'atc3' },
        { id: 4, name: 'Primary Book name 4', code: 'atc4' },
        { id: 5, name: 'Primary Book name 5', code: 'atc5' },
        { id: 6, name: 'Primary Book name 6', code: 'atc6' },
    ],
    page_title: 'Primary Books',
    action_word: 'PrimaryBook',
    selected_id: -1,
    current_sort: {
        field_name: 'name',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'name', label: 'Name', input_type: 'text', ref_table: undefined },
        { field_name: 'code', label: 'Code', input_type: 'text', ref_table: undefined },
    ],
    list_template: [
        { field_name: 'code', width: '20%' },
        { field_name: 'name', width: '40%' },
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['name'],
                    ['code'],
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