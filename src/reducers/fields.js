import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: 'Fields',
  selected_id: -1,
  current_sort: {
    field_name: 'name',
    direction: 'ASC'
  },
  current_filters: {},
  mode: 'display',
  fields: {
    name: {
      label: 'Field Name',
      input_type: 'text',
      ref_table: undefined
    },
    code: {
      label: 'Code',
      input_type: 'text',
      ref_table: undefined
    },
    description: {
      label: 'Description',
      input_type: 'text',
      ref_table: undefined
    },
    input_type: {
      label: 'Input Type',
      input_type: 'radio',
      ref_table: undefined,
      options: [
        {
          id: 1,
          display: 'Text'
        },
        {
          id: 2,
          display: 'Select'
        },
        {
          id: 3,
          display: 'Date'
        },
        {
          id: 4,
          display: 'Radio'
        },
        {
          id: 5,
          display: 'Checkbox'
        }
      ]
    },
    ref_table: {
      label: 'Table',
      input_type: 'text',
      ref_table: undefined
    },
    filter_fld: {
      label: 'Filter Field',
      input_type: 'text',
      ref_table: undefined
    },
    filter_val: {
      label: 'Filter Value',
      input_type: 'text',
      ref_table: undefined
    }
  },
  list_template: {
    fields: [
    { field_name: 'code', width: '20%' },
    { field_name: 'name', width: '30%' },
    { field_name: 'description', width: '50%' }
    ],
    width: '40%'
  },  
  details_template: {
    current_tab: '',
    tabs: [
      {
        name: '',
        rows: [
          ['code', 'name'],
          ['description'],
          ['input_type', 'ref_table'],
          ['filter_fld', 'filter_val']
        ]
      }
    ]
  },
  context_menu: [
    {
      label: 'Ad Types',
      link: 'fields',
      filter_on: 'ad_type',
      select_on: undefined
    }
  ],
  ref_list: [],
  referenced_tables: [],
  ref_list_dirty: true,
  typeahead: ''
})

export default initial_state
