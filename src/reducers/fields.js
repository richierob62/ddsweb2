import Immutable from 'immutable'


const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Field name 1', code: 'atc1', description: 'Field Description 1', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
        { id: 2, name: 'Field name 2', code: 'atc2', description: 'Field Description 2', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
        { id: 3, name: 'Field name 3', code: 'atc3', description: 'Field Description 3', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
        { id: 4, name: 'Field name 4', code: 'atc4', description: 'Field Description 4', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
        { id: 5, name: 'Field name 5', code: 'atc5', description: 'Field Description 5', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
        { id: 6, name: 'Field name 6', code: 'atc6', description: 'Field Description 6', input_type: 1, ref_table: 'foo', filter_fld: 'bar', filter_val: 'baz' },
    ],
    page_title: 'Fields',
    action_word: 'Field',
    selected_id: -1,
    current_sort: {
        field_name: 'name',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'name', label: 'Name', input_type: 'text', ref_table: undefined },
        { field_name: 'code', label: 'Code', input_type: 'text', ref_table: undefined },
        { field_name: 'description', label: 'Description', input_type: 'text', ref_table: undefined },
        { field_name: 'input_type', label: 'Input Type', input_type: 'radio', ref_table: undefined },
        { field_name: 'ref_table', label: 'Table', input_type: 'text', ref_table: undefined },
        { field_name: 'filter_fld', label: 'Filter Field', input_type: 'text', ref_table: undefined },
        { field_name: 'filter_val', label: 'Filter Value', input_type: 'text', ref_table: undefined },
    ],
    list_template: [
        { field_name: 'code', width: '20%' },
        { field_name: 'name', width: '20%' },
        { field_name: 'description', width: '50%' }
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['code', 'name'],
                    ['description'],
                    ['input_type', 'ref_table'],
                    ['filter_fld', 'filter_val'],
                ]
            }
        ]
    },
    context_menu: [
        { label: 'Ad Types', link: 'fields', filter_on: 'ad_type', select_on: undefined },
    ],
    radio_groups: [
        {
            field_name: 'input_type',
            options: [
                { id: 1, display: 'text' },
                { id: 2, display: 'select' },
                { id: 3, display: 'typeahead' },
            ]
        },
    ],    
    ref_list: [],
    typeahead: ''    
})

export default initial_state