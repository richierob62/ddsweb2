import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'foo', code: 'foo', email: 'foo', address: 'foo', city: 'foo', state: 'foo', zip: 'foo', phone: 'foo', is_rep: 'foo', is_admin: 'foo', is_active: 'foo', compensation_plan: 'foo', commission_new: 'foo', commission_renew: 'foo' },
        { id: 2, name: 'foo', code: 'foo', email: 'foo', address: 'foo', city: 'foo', state: 'foo', zip: 'foo', phone: 'foo', is_rep: 'foo', is_admin: 'foo', is_active: 'foo', compensation_plan: 'foo', commission_new: 'foo', commission_renew: 'foo' }
    ],
    page_title: 'Sales Reps',
    action_word: 'SalesRep',
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
        { field_name: 'email', label: 'Email', input_type: 'text', ref_table: undefined },
        { field_name: 'address', label: 'Address', input_type: 'text', ref_table: undefined },
        { field_name: 'city', label: 'City', input_type: 'text', ref_table: undefined },
        { field_name: 'state', label: 'State', input_type: 'text', ref_table: undefined },
        { field_name: 'zip', label: 'Zip', input_type: 'text', ref_table: undefined },
        { field_name: 'phone', label: 'Phone', input_type: 'text', ref_table: undefined },
        { field_name: 'is_rep', label: 'Rep', input_type: 'checkbox', ref_table: undefined },
        { field_name: 'is_admin', label: 'Admin', input_type: 'checkbox', ref_table: undefined },
        { field_name: 'is_active', label: 'Active', input_type: 'checkbox', ref_table: undefined },
        { field_name: 'compensation_plan', label: 'Compensation Plan', input_type: 'select', ref_table: 'compensation_plan' },
        { field_name: 'commission_new', label: 'Commission on New', input_type: 'text', ref_table: undefined },
        { field_name: 'commission_renew', label: 'Commission on Renewal', input_type: 'text', ref_table: undefined },
    ],
    list_template: [
        { field_name: 'code', width: '10%' },
        { field_name: 'name', width: '25%' },
        { field_name: 'email', width: '20%' },
        { field_name: 'address', width: '25%' },
        { field_name: 'city', width: '10%' },
        { field_name: 'state', width: '5%' },
        { field_name: 'zip', width: '5%' },
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