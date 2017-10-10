import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Pay Plans',
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
    }
  },
  list_template: {
    fields: [
      { field_name: 'code', width: '30%' },
      { field_name: 'name', width: '70%' }
    ],
    width: '40%'
  },
  details_template: {
    current_tab: 'Main',
    label_field: 'name',
    tabs: [
      {
        name: 'Main',
        rows: [['code'], ['name']]
      }
    ]
  },
  context_menu: [],
  ref_list: [],
  referenced_tables: [],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
