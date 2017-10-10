import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Ad Types',
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
    page_type: {
      label: 'Page Type',
      input_type: 'select',
      ref_table: 'page_types'
    }
  },
  list_template: {
    fields: [
      { field_name: 'code', width: '20%' },
      { field_name: 'name', width: '40%' },
      { field_name: 'page_type', width: '40%' }
    ],
    width: '50%'
  },
  details_template: {
    current_tab: 'Main',
    label_field: 'name',
    tabs: [
      {
        name: 'Main',
        rows: [['code'], ['name'], ['page_type']]
      }
    ]
  },
  context_menu: [
    {
      label: 'Udacs',
      link: 'udacs',
      filter_on: 'ad_type',
      select_on: undefined
    }
  ],
  ref_list: [],
  referenced_tables: ['page_types'],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
