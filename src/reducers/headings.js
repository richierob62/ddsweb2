import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Headings',
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
    sort_name: {
      label: 'Sort Name',
      input_type: 'text',
      ref_table: undefined
    },
    heading_num: {
      label: 'Heading #',
      input_type: 'text',
      ref_table: undefined
    },
    page_type: {
      label: 'Page Type',
      input_type: 'select',
      ref_table: 'page_types'
    }
  },
  list_template: [
    { field_name: 'heading_num', width: '20%' },
    { field_name: 'name', width: '30%' },
    { field_name: 'sort_name', width: '30%' },
    { field_name: 'page_type', width: '20%' }
  ],
  details_template: {
    current_tab: 'Main',
    tabs: [
      {
        name: 'Main',
        rows: [['heading_num'], ['name'], ['sort_name'], ['page_type']]
      }
    ]
  },
  context_menu: [],
  ref_list: [],
  referenced_tables: ['page_types'],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
