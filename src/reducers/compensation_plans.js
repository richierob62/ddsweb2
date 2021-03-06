import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Compensation Plans',
  selected_id: -1,
  current_sort: {
    field_name: 'name',
    direction: 'ASC'
  },
  current_filters: {},
  mode: 'display',
  fields: {
    name: { label: 'Name', input_type: 'text', ref_table: undefined },
    code: { label: 'Code', input_type: 'text', ref_table: undefined }
  },
  list_template: {
    fields: [
      { field_name: 'code', width: '30%' },
      { field_name: 'name', width: '70%' }
    ],
    width: '40%'
  },
  details_template: {
    current_tab: '',
    label_field: 'name',
    tabs: [
      {
        name: '',
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
