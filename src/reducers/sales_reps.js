import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Sales Reps',
  selected_id: -1,
  current_sort: {
    field_name: 'name',
    direction: 'ASC'
  },
  current_filters: {},
  mode: 'display',
  fields: {
    name: { label: 'Name', input_type: 'text', ref_table: undefined },
    code: { label: 'Code', input_type: 'text', ref_table: undefined },
    email: { label: 'Email', input_type: 'text', ref_table: undefined },
    address: { label: 'Address', input_type: 'text', ref_table: undefined },
    city: { label: 'City', input_type: 'text', ref_table: undefined },
    state: { label: 'State', input_type: 'text', ref_table: undefined },
    zip: { label: 'Zip', input_type: 'text', ref_table: undefined },
    phone: { label: 'Phone', input_type: 'text', ref_table: undefined },
    is_rep: { label: 'Is Rep', input_type: 'checkbox', ref_table: undefined },
    is_admin: {
      label: 'Is Admin',
      input_type: 'checkbox',
      ref_table: undefined
    },
    is_active: {
      label: 'Is Active',
      input_type: 'checkbox',
      ref_table: undefined
    },
    compensation_plan: {
      label: 'Comp. Plan',
      input_type: 'select',
      ref_table: 'compensation_plans'
    },
    commission_new: {
      label: 'New Comm',
      input_type: 'text',
      ref_table: undefined
    },
    commission_renew: {
      label: 'Renewal Comm.',
      input_type: 'text',
      ref_table: undefined
    }
  },
  list_template: {
    fields: [
      { field_name: 'code', width: '7%' },
      { field_name: 'name', width: '20%' },
      { field_name: 'email', width: '20%' },
      { field_name: 'address', width: '20%' },
      { field_name: 'city', width: '15%' },
      { field_name: 'state', width: '10%' },
      { field_name: 'zip', width: '8%' }
    ],
    width: '100%'
  },  
  details_template: {
    current_tab: 'Contact',
    tabs: [
      {
        name: 'Contact',
        rows: [
          ['code'],
          ['name'],
          ['address'],
          ['city'],
          ['state', 'zip'],
          ['email', 'phone']
        ]
      },
      {
        name: 'Payment',
        rows: [['compensation_plan'], ['commission_new'], ['commission_renew']]
      },
      {
        name: 'Access',
        rows: [['is_active'], ['is_rep'], ['is_admin']]
      }
    ]
  },
  context_menu: [
    {
      label: 'Customers',
      link: 'customers',
      filter_on: 'sales_rep',
      select_on: undefined
    },
    {
      label: 'Orders',
      link: 'orders',
      filter_on: 'sales_rep',
      select_on: undefined
    }
  ],
  ref_list: [],
  referenced_tables: ['compensation_plans'],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
