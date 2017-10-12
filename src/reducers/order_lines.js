import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Order Lines',
  selected_id: -1,
  current_sort: {
    field_name: 'sequence',
    direction: 'ASC'
  },
  current_filters: {},
  mode: 'display',
  fields: {
    order: {
      label: 'Order #',
      input_type: 'select',
      ref_table: 'orders'
    },
    udac: {
      label: 'Udac',
      input_type: 'select',
      ref_table: 'udacs'
    },
    sequence: {
      label: 'Sequence',
      input_type: 'text',
      readonly: true,
      ref_table: undefined
    }
  },
  list_template: {
    fields: [
      { field_name: 'order', width: '30%' },
      { field_name: 'sequence', width: '30%' },
      { field_name: 'udac', width: '40%' }
    ],
    width: '40%'
  },
  details_template: {
    current_tab: '',
    label_field: 'sequence',
    tabs: [
      {
        name: '',
        rows: [['order'], ['sequence'], ['udac']]
      }
    ]
  },
  context_menu: [],
  ref_list: [],
  referenced_tables: ['orders', 'udacs'],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
