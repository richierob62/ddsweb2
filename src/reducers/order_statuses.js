import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Order Status name 1', code: 'ord_status1' },
        { id: 2, name: 'Order Status name 2', code: 'ord_status2' },
        { id: 3, name: 'Order Status name 3', code: 'ord_status3' },
        { id: 4, name: 'Order Status name 4', code: 'ord_status4' },
        { id: 5, name: 'Order Status name 5', code: 'ord_status5' },
        { id: 6, name: 'Order Status name 6', code: 'ord_status6' },
    ],
    page_title: 'Order Statuses',
    action_word: 'OrderStatus',
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