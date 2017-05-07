import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        {
            id: 1, order_num: '100', sales_rep: 2, order_status: 4, customer: 1, order_date: '2017-01-15', primary_book: 6
        },
        {
            id: 2, order_num: '101', sales_rep: 2, order_status: 3, customer: 1, order_date: '2017-01-15', primary_book: 2
        },
        {
            id: 3, order_num: '102', sales_rep: 2, order_status: 6, customer: 1, order_date: '2017-01-15', primary_book: 5
        }
    ],
    page_title: 'Orders',
    action_word: 'Order',
    selected_id: -1,
    current_sort: {
        field_name: 'order_num',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'order_num', label: 'Order #', input_type: 'text', ref_table: undefined, readonly: true },
        { field_name: 'sales_rep', label: 'Sales Rep', input_type: 'typeahead', ref_table: 'sales_rep' },
        { field_name: 'order_status', label: 'Status', input_type: 'select', ref_table: 'order_status' },
        { field_name: 'customer', label: 'Customer', input_type: 'typeahead', ref_table: 'customer' },
        { field_name: 'order_date', label: 'Order Date', input_type: 'date', ref_table: undefined },
        { field_name: 'primary_book', label: 'Primary Book', input_type: 'select', ref_table: 'primary_book' }
    ],
    list_template: [
        { field_name: 'order_num', width: '10%' },
        { field_name: 'customer', width: '35%' },
        { field_name: 'order_date', width: '10%' },
        { field_name: 'primary_book', width: '15%' },
        { field_name: 'order_status', width: '15%' },
        { field_name: 'sales_rep', width: '15%' }
    ],
    details_template: {
        current_tab: 'Basic Information',
        tabs: [
            {
                name: 'Basic Information',
                rows: [
                    ['order_num'],
                    ['customer'],
                    ['order_date', 'primary_book'],
                    ['area', 'fax_area'],
                    ['order_status', 'sales_rep'],
                ]
            }
        ]
    },
    context_menu: [
        { label: 'Primary Book', link: 'primary_books', filter_on: undefined, select_on: 'primary_book' },
        { label: 'Customer', link: 'customers', filter_on: undefined, select_on: 'customer' },
        { label: 'Sales Rep', link: 'sales_reps', filter_on: undefined, select_on: 'sales_rep' },
    ],
    radio_groups: [],
    ref_list: [],
    typeahead: ''    
})

export default initial_state