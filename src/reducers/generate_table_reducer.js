import Immutable from 'immutable'

const generateTableReducer = (table_name, initial_state) => {

    const ucname = table_name.toUpperCase()

    const BEGIN_x_CREATE = 'BEGIN_' + ucname + '_CREATE'
    const BEGIN_x_DELETE = 'BEGIN_' + ucname + '_DELETE'
    const BEGIN_x_DUPLICATE = 'BEGIN_' + ucname + '_DUPLICATE'
    const BEGIN_x_EDIT = 'BEGIN_' + ucname + '_EDIT'
    const CANCEL_x = 'CANCEL_' + ucname + ''
    const CHANGE_x_DATA = 'CHANGE_' + ucname + '_DATA'
    const CHANGE_x_FILTER = 'CHANGE_' + ucname + '_FILTER'
    const DELETE_x_COMPLETED = 'DELETE_' + ucname + '_COMPLETED'
    const LOAD_x_LIST_COMPLETED = 'LOAD_' + ucname + '_LIST_COMPLETED'
    const LOAD_x_REFERENCE_COMPLETED = 'LOAD_' + ucname + '_REFERENCE_COMPLETED'
    const SAVE_x_COMPLETED = 'SAVE_' + ucname + '_COMPLETED'
    const SELECT_x = 'SELECT_' + ucname + ''
    const SELECT_x_TAB = 'SELECT_' + ucname + '_TAB'
    const PREVIOUS_x_SUBLIST = 'PREVIOUS_' + ucname + '_SUBLIST'
    const NEXT_x_SUBLIST = 'NEXT_' + ucname + '_SUBLIST'

    return (state = initial_state, action) => {

        switch (action.type) {

            case BEGIN_x_CREATE:
                {
                    const id = Math.floor(Math.random() * 1000000 + 1000000)
                    const new_copy = state
                        .get('fields')
                        .toJS()
                        .reduce((acc, field) => {
                            if (field.ref_table !== undefined)
                                return Object.assign({}, acc, {
                                    [field.field_name]: undefined
                                })
                            if (field.input_type === 'radio')
                                return Object.assign({}, acc, {
                                    [field.field_name]: 1
                                })
                            if (field.input_type === 'date')
                                return Object.assign({}, acc, {
                                    [field.field_name]: undefined
                                })
                            return Object.assign({}, acc, {
                                [field.field_name]: ''
                            })
                        }, { id: id })
                    return state.updateIn(['list'], list => list.push(Immutable.fromJS(new_copy)))
                        .set('selected_id', id)
                        .set('mode', 'new')
                }

            case BEGIN_x_DELETE:
                {
                    return state.set('mode', 'delete')
                }

            case BEGIN_x_DUPLICATE:
                {
                    const new_id = Math.floor(Math.random() * 1000000 + 1000000)
                    const id = state.get('selected_id')
                    const current = state
                        .get('list')
                        .find(item => item.get('id') === id)
                        .toJS()
                    const new_copy = Object.assign({}, current, {
                        id: new_id,
                        account_num: ''
                    })
                    return state.updateIn(['list'], list => list.push(Immutable.fromJS(new_copy)))
                        .set('selected_id', new_id)
                        .set('mode', 'duplicate')
                }

            case BEGIN_x_EDIT:
                {
                    const id = state.get('selected_id')
                    const current = state
                        .get('list')
                        .find(cust => cust.get('id') === id)
                    const backup_copy = Immutable.fromJS(Object.assign({}, current.toJS()))
                    return state
                        .set('mode', 'edit')
                        .set('backup_copy', backup_copy)
                }

            case CANCEL_x:
                {
                    const mode = state.get('mode')
                    switch (mode) {
                        // edit
                        case 'edit':
                            {
                                const temp_id = state.get('selected_id')
                                const index = state
                                    .get('list')
                                    .findIndex(item => item.get('id') === temp_id)
                                const backup_copy = state.get('backup_copy')
                                return state.updateIn(['list'], list => list.set(index, backup_copy))
                                    .set('mode', 'display')
                                    .set('backup_copy', undefined)
                            }
                        // new duplicate
                        case 'new':
                        case 'duplicate':
                            {
                                const id = state.get('selected_id')
                                const index = state
                                    .get('list')
                                    .findIndex(item => item.get('id') === id)
                                return state.updateIn(['list'], list => list.delete(index))
                                    .set('mode', 'display')
                                    .set('selected_id', -1)
                            }
                        // delete
                        case 'delete':
                            {
                                return state.set('mode', 'display')
                            }
                        default:
                            return state
                    }
                }

            case CHANGE_x_DATA:
                {
                    return state.updateIn(['list'], list => {
                        return list.update(list.findIndex(item => {
                            return item.get('id') === state.get('selected_id')
                        }), item => {
                            return item.set(action.payload.field, action.payload.value);
                        })
                    })
                }

            case CHANGE_x_FILTER:
                {
                    return state
                        .setIn(['current_filters', action.payload.column], action.payload.value)
                        .set('list_dirty', true)
                }

            // sort removed; moved to saga

            case DELETE_x_COMPLETED:
                {
                    const id = state.get('selected_id')
                    const index = state
                        .get('list')
                        .findIndex(item => item.get('id') === id)
                    return state.updateIn(['list'], list => list.delete(index))
                        .set('mode', 'display')
                        .set('selected_id', -1)
                        .set('list_dirty', true)
                }

            case LOAD_x_LIST_COMPLETED:
                {
                    const selected_id = state.get('selected_id')

                    const selectedIdInNewList = selected_id === -1
                        ? false
                        : action
                            .payload
                            .filter(entry => entry.id === selected_id)
                            .length === 0
                            ? false
                            : true

                    const newList = Immutable.fromJS(action.payload)
                    return selectedIdInNewList
                        ? state
                            .set('list', newList)
                            .set('list_dirty', false)
                            .set('first_index', 0)
                        : state
                            .set('list', newList)
                            .set('selected_id', -1)
                            .set('list_dirty', false)
                            .set('first_index', 0)
                }

            case LOAD_x_REFERENCE_COMPLETED:
                {
                    const newList = Immutable.fromJS(action.payload)
                    return state
                        .set('ref_list', newList)
                        .set('ref_list_dirty', false)
                }

            case SAVE_x_COMPLETED:
                {

                    const mode = state.get('mode')

                    if (mode === 'edit')
                        return state.set('mode', 'display').set('backup_copy', undefined)

                    const temp_id = state.get('selected_id')
                    const currentObj = state
                        .get('list')
                        .findEntry(item => item.get('id') === temp_id)
                    const current = currentObj[1].set('id', action.payload)

                    return state.updateIn(['list'], list => list.set(currentObj[0], current))
                        .set('mode', 'display')
                        .set('selected_id', action.payload)
                }

            case SELECT_x:
                {
                    if (state.get('mode') !== 'display')
                        return state
                    return state.set('selected_id', action.payload)
                }

            case SELECT_x_TAB:
                {
                    return state.setIn([
                        'details_template', 'current_tab'
                    ], action.payload)
                }

            case PREVIOUS_x_SUBLIST:
                {
                    const new_idx = state.get('first_index') - 5 < 0 ?
                        0 :
                        state.get('first_index') - 5

                    return state.set('first_index', new_idx)
                }

            case NEXT_x_SUBLIST:
                {
                    const list_size = state.get('list').count()
                    const new_idx = state.get('first_index') + 10 > list_size ?
                        (list_size - 5 < 0 ? 0 : list_size - 5) :
                        state.get('first_index') + 5

                    return state.set('first_index', new_idx)
                }

            case 'SORT_CHANGE_COMPLETED':
                {

                    if (action.payload.reducer === state.get('reducer_name')) {

                        const is_dirty = action.payload.field_name !== state.getIn(['current_sort', 'field_name'])

                        if (is_dirty) {
                            return state
                                .setIn([
                                    'current_sort', 'field_name'
                                ], action.payload.field_name)
                                .setIn([
                                    'current_sort', 'direction'
                                ], action.payload.direction)
                                .set('first_index', 0)
                                .set('list', action.payload.list)
                                .set('list_dirty', true)
                        }
                        else {
                            return state
                                .setIn([
                                    'current_sort', 'field_name'
                                ], action.payload.field_name)
                                .setIn([
                                    'current_sort', 'direction'
                                ], action.payload.direction)
                                .set('first_index', 0)
                                .set('list', action.payload.list)
                        }
                    }
                    else {
                        return state
                    }
                }

            default:
                return state

        }

    }
}

export default generateTableReducer