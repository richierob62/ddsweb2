import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Source Book name 1', code: 'atc1' },
        { id: 2, name: 'Source Book name 2', code: 'atc2' },
        { id: 3, name: 'Source Book name 3', code: 'atc3' },
        { id: 4, name: 'Source Book name 4', code: 'atc4' },
        { id: 5, name: 'Source Book name 5', code: 'atc5' },
        { id: 6, name: 'Source Book name 6', code: 'atc6' },
    ],
    page_title: 'Source Books',
    action_word: 'SourceBook',
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
        { field_name: 'yppa_num', label: 'YPPA #', input_type: 'text', ref_table: undefined },
        { field_name: 'pub_month', label: 'Publish Date', input_type: 'date', ref_table: undefined },
        { field_name: 'sales_start', label: 'Sales Start', input_type: 'date', ref_table: undefined },
        { field_name: 'sales_close', label: 'Sales Close', input_type: 'date', ref_table: undefined },
    ],
    list_template: [
        { field_name: 'code', width: '10%' },
        { field_name: 'name', width: '30%' },
        { field_name: 'yppa_num', width: '15%' },
        { field_name: 'pub_month', width: '15%' },
        { field_name: 'sales_start', width: '15%' },
        { field_name: 'sales_close', width: '15%' },
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['code', 'name'],
                    ['yppa_num'],
                    ['pub_month'],
                    ['sales_start', 'sales_close'],
                ]
            }
        ]
    },
    context_menu: [],
    radio_groups: [],
    ref_list: [],
    typeahead: ''    
})

export default initial_state