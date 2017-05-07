import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        {
            id: 1,
            name: 'Ad Type name 1',
            code: 'atc1',
            page_type: 1
        }, {
            id: 2,
            name: 'Ad Type name 2',
            code: 'atc2',
            page_type: 2
        }, {
            id: 3,
            name: 'Ad Type name 3',
            code: 'atc3',
            page_type: 1
        }, {
            id: 4,
            name: 'Ad Type name 4',
            code: 'atc4',
            page_type: 2
        }, {
            id: 5,
            name: 'Ad Type name 5',
            code: 'atc5',
            page_type: 1
        }, {
            id: 6,
            name: 'Ad Type name 6',
            code: 'atc6',
            page_type: 3
        }
    ],
    page_title: 'Categories',
    action_word: 'Category',
    selected_id: -1,
    current_sort: {
        field_name: 'name',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        {
            field_name: 'name',
            label: 'Name',
            input_type: 'text',
            ref_table: undefined
        }, {
            field_name: 'code',
            label: 'Code',
            input_type: 'text',
            ref_table: undefined
        }
    ],
    list_template: [
        {
            field_name: 'code',
            width: '20%'
        }, {
            field_name: 'name',
            width: '40%'
        }
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [['name'], ['code']
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