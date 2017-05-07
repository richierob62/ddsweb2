import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Local Foreign name 1', code: 'localforeign1' },
        { id: 2, name: 'Local Foreign name 2', code: 'localforeign2' },
        { id: 3, name: 'Local Foreign name 3', code: 'localforeign3' },
        { id: 4, name: 'Local Foreign name 4', code: 'localforeign4' },
        { id: 5, name: 'Local Foreign name 5', code: 'localforeign5' },
        { id: 6, name: 'Local Foreign name 6', code: 'localforeign6' },
    ],
    page_title: 'Local Foreigns',
    action_word: 'LocalForeign',
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
    ],
    list_template: [
        { field_name: 'code', width: '20%' },
        { field_name: 'name', width: '40%' },
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['name'],
                    ['code'],
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