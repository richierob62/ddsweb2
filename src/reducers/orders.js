import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Orders',
  selected_id: -1,
  current_sort: {
    field_name: 'order_num',
    direction: 'ASC'
  },
  current_filters: {},
  mode: 'display',
  fields: {
    order_num: {
      label: 'Order #',
      input_type: 'text',
      ref_table: undefined,
      readonly: true
    },
    sales_rep: {
      label: 'Sales Rep',
      input_type: 'select',
      ref_table: 'sales_reps'
    },
    order_status: {
      label: 'Status',
      input_type: 'select',
      ref_table: 'order_statuses'
    },
    customer: {
      label: 'Customer',
      input_type: 'select',
      ref_table: 'customers'
    },
    order_date: {
      label: 'Order Date',
      input_type: 'date',
      ref_table: undefined
    },
    primary_book: {
      label: 'Primary Book',
      input_type: 'select',
      ref_table: 'primary_books'
    }
  },
  list_template: {
    fields: [
      { field_name: 'order_num', width: '10%' },
      { field_name: 'customer', width: '35%' },
      { field_name: 'order_date', width: '10%' },
      { field_name: 'primary_book', width: '15%' },
      { field_name: 'order_status', width: '15%' },
      { field_name: 'sales_rep', width: '15%' }
    ],
    width: '100%'
  },
  details_template: {
    current_tab: '',
    label_field: 'order_num',
    tabs: [
      {
        name: '',
        rows: [
          ['order_num'],
          ['customer'],
          ['order_date', 'primary_book'],
          ['order_status', 'sales_rep']
        ]
      }
    ]
  },
  context_menu: [],
  ref_list: [],
  referenced_tables: [
    'sales_reps',
    'order_statuses',
    'customers',
    'primary_books'
  ],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
