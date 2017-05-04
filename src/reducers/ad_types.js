import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Ad Type name 1', code: 'atc1', page_type: 1 },
        { id: 2, name: 'Ad Type name 2', code: 'atc2', page_type: 2 },
        { id: 3, name: 'Ad Type name 3', code: 'atc3', page_type: 1 },
        { id: 4, name: 'Ad Type name 4', code: 'atc4', page_type: 2 },
        { id: 5, name: 'Ad Type name 5', code: 'atc5', page_type: 1 },
        { id: 6, name: 'Ad Type name 6', code: 'atc6', page_type: 3 },
    ],
    page_title: 'Ad Types',
    action_word: 'AdType',
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
        { field_name: 'page_type', label: 'Page Type', input_type: 'select', ref_table: 'page_type' }
    ],
    list_template: [
        { field_name: 'code', width: '20%' },
        { field_name: 'name', width: '40%' },
        { field_name: 'page_type', width: '25%' }
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['name'],
                    ['code'],
                    ['page_type']
                ]
            }
        ]
    },
    context_menu: [
        { label: 'Udacs', link: 'udacs', filter_on: 'ad_type', select_on: undefined },
        { label: 'Page Type', link: 'page_types', filter_on: undefined, select_on: 'page_type' },
    ],
    radio_groups: [],
    ref_list: [],
    typeahead: ''    
})

const ad_types = (state = initial_state, action) => {
    switch (action.type) {

        case 'SELECT_AD_TYPE': {
            if (state.get('mode') !== 'display') return state
            return state.set('selected_id', action.payload)
        }

        case 'SELECT_AD_TYPE_TAB': {
            return state.setIn(['details_template', 'current_tab'], action.payload)
        }

        case 'CHANGE_AD_TYPE_SORT': {
            const sorted_on = state.getIn(['current_sort', 'field_name'])
            const sorted_dir = state.getIn(['current_sort', 'direction'])
            const new_direction = action.payload === sorted_on
                ? (sorted_dir === 'ASC'
                    ? 'DESC'
                    : 'ASC')
                : 'ASC'
            return state.setIn(['current_sort', 'field_name'], action.payload)
                .setIn(['current_sort', 'direction'], new_direction)
        }

        case 'CHANGE_AD_TYPE_FILTER': {
            return state.setIn(['current_filters', action.payload.column], action.payload.value)
        }

        case 'CHANGE_AD_TYPE_DATA': {
            return state.updateIn(
                ['list'],
                list => {
                    return list.update(
                        list.findIndex(item => {
                            return item.get('id') === state.get('selected_id')
                        }),
                        item => {
                            return item.set(action.payload.field, action.payload.value);
                        }
                    )
                }
            )
        }

        case 'BEGIN_AD_TYPE_EDIT': {
            const id = state.get('selected_id')
            const current = state.get('list').find(cust => cust.get('id') === id)
            const backup_copy = Immutable.fromJS(Object.assign({}, current.toJS()))
            return state.set('mode', 'edit')
                .set('backup_copy', backup_copy)
        }

        case 'BEGIN_AD_TYPE_CREATE': {
            const id = Math.floor(Math.random() * 1000000 + 1000000)
            const new_copy = state.get('fields')
                .toJS()
                .reduce((acc, field) => {
                    if (field.ref_table !== undefined) return Object.assign({}, acc, { [field.field_name]: undefined })
                    if (field.input_type === 'radio') return Object.assign({}, acc, { [field.field_name]: 1 })
                    if (field.input_type === 'date') return Object.assign({}, acc, { [field.field_name]: undefined })
                    return Object.assign({}, acc, { [field.field_name]: '' })
                }, { id: id })
            return state.updateIn(
                ['list'],
                list => list.push(Immutable.fromJS(new_copy))
            )
                .set('selected_id', id)
                .set('mode', 'new')
        }

        case 'BEGIN_AD_TYPE_DUPLICATE': {
            const new_id = Math.floor(Math.random() * 1000000 + 1000000)
            const id = state.get('selected_id')
            const current = state.get('list').find(item => item.get('id') === id)
                .toJS()
            const new_copy = Object.assign({}, current, { id: new_id, account_num: '' })
            return state.updateIn(
                ['list'],
                list => list.push(Immutable.fromJS(new_copy))
            )
                .set('selected_id', new_id)
                .set('mode', 'duplicate')
        }

        case 'BEGIN_AD_TYPE_DELETE': {
            return state.set('mode', 'delete')
        }

        case 'SAVE_AD_TYPE_COMPLETED': {

            const mode = state.get('mode')

            if (mode === 'edit')
                return state.set('mode', 'display').set('backup_copy', undefined)

            const temp_id = state.get('selected_id')
            const currentObj = state.get('list').findEntry(item => item.get('id') === temp_id)
            const current = currentObj[1].set('id', action.payload)

            return state.updateIn(
                ['list'],
                list => list.set(currentObj[0], current)
            )
                .set('mode', 'display')
                .set('selected_id', action.payload)
        }

        case 'DELETE_AD_TYPE_COMPLETED': {
            const id = state.get('selected_id')
            const index = state.get('list').findIndex(item => item.get('id') === id)
            return state.updateIn(
                ['list'],
                list => list.delete(index)
            )
                .set('mode', 'display')
                .set('selected_id', -1)
        }

        case 'CANCEL_AD_TYPE': {
            const mode = state.get('mode')
            switch (mode) {
                // edit
                case 'edit': {
                    const temp_id = state.get('selected_id')
                    const index = state.get('list').findIndex(item => item.get('id') === temp_id)
                    const backup_copy = state.get('backup_copy')
                    return state.updateIn(
                        ['list'],
                        list => list.set(index, backup_copy)
                    )
                        .set('mode', 'display')
                        .set('backup_copy', undefined)
                }
                // new
                // duplicate
                case 'new':
                case 'duplicate': {
                    const id = state.get('selected_id')
                    const index = state.get('list').findIndex(item => item.get('id') === id)
                    return state.updateIn(
                        ['list'],
                        list => list.delete(index)
                    )
                        .set('mode', 'display')
                        .set('selected_id', -1)
                }
                // delete
                case 'delete': {
                    return state.set('mode', 'display')
                }
                default: return state
            }
        }

        case 'LOAD_AD_TYPE_LIST_COMPLETED': {
            const newList = Immutable.fromJS(action.payload)
            return state.set('list', newList)
            .set('mode', 'display')
            .set('selected_id', -1)
        }

        case 'LOAD_AD_TYPE_REFERENCE_COMPLETED': {
            const newList = Immutable.fromJS(action.payload)
            return state.set('ref_list', newList)
        }

        default: return state
    }
}

export default ad_types