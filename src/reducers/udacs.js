import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Udacs',
  selected_id: -1,
  current_sort: {
    field_name: 'code',
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
    rate: {
      label: 'Rate',
      input_type: 'text',
      ref_table: undefined
    },
    primary_book: {
      label: 'Primary Book',
      input_type: 'select',
      ref_table: 'primary_books'
    },
    ad_type: {
      label: 'Ad Type',
      input_type: 'select',
      ref_table: 'ad_types'
    }
  },
  list_template: {
    fields: [
      { field_name: 'code', width: '10%' },
      { field_name: 'name', width: '30%' },
      { field_name: 'primary_book', width: '20%' },
      { field_name: 'ad_type', width: '20%' },
      { field_name: 'rate', width: '20%' }
    ],
    width: '70%'
  },  
  details_template: {
    current_tab: 'Main',
    tabs: [
      {
        name: 'Main',
        rows: [['code', 'name'], ['primary_book'], ['ad_type'], ['rate']]
      }
    ]
  },
  context_menu: [],
  ref_list: [],
  referenced_tables: ['primary_books', 'ad_types'],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
