import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, order: 1,  udac: 1,  sequence: 1 },
        { id: 3, order: 1,  udac: 1,  sequence: 2 },
        { id: 5, order: 1,  udac: 1,  sequence: 3 },
        { id: 2, order: 2,  udac: 2,  sequence: 1 },
        { id: 4, order: 2,  udac: 2,  sequence: 2 },
        { id: 6, order: 3,  udac: 3,  sequence: 1 },
    ],
    page_title: 'Order Lines',
    action_word: 'Order Line',
    selected_id: -1,
    current_sort: {
        field_name: 'sequence',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'order', label: 'Order', input_type: 'typeahead', ref_table: 'order' },
        { field_name: 'udac', label: 'Udac', input_type: 'typeahead', ref_table: 'udac' },
        { field_name: 'sequence', label: 'Sequence', input_type: 'text', ref_table: undefined }
    ],
    list_template: [
        { field_name: 'order', width: '20%' },
        { field_name: 'sequence', width: '30%' },
        { field_name: 'udac', width: '30%' },
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['order'],
                    ['sequence'],
                    ['udac'],
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