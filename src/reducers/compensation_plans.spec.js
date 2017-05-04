import {createStore, combineReducers} from 'redux'
import act from '../actions/'
import ad_types from './ad_types'

const rootReducer = combineReducers({ad_types})

it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: ad_types should handle action: selectAdType', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectAdType(2))
    const newState = store.getState()['ad_types']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: ad_types should handle action: selectAdTypeTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectAdTypeTab('foo'))
    const newState = store.getState()['ad_types']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: ad_types should handle action: changeAdTypeData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeAdTypeData(newData))

    const newState = store.getState()['ad_types']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: ad_types should handle action: changeAdTypeFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeAdTypeFilter(newData))

    const newState = store.getState()['ad_types']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeAdTypeFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['ad_types']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: ad_types should handle action: changeAdTypeSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeAdTypeSort('foo'))

    const newState = store.getState()['ad_types']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: ad_types should handle action: beginAdTypeEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    store.dispatch(act.beginAdTypeEdit())

    const newState = store.getState()['ad_types']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: ad_types should handle action: beginAdTypeCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.beginAdTypeCreate())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numAdTypes + 1)

})

it('reducer: ad_types should handle action: beginAdTypeDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    store.dispatch(act.beginAdTypeDelete())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: ad_types should handle action: beginAdTypeDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.beginAdTypeDuplicate())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numAdTypes + 1)

})

it('reducer: ad_types should handle action: cancelAdType after beginAdTypeEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const original_val = store
        .getState()['ad_types']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginAdTypeEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeAdTypeData(newData))
    store.dispatch(act.cancelAdType())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: ad_types should handle action: cancelAdType after beginAdTypeCreate', () => {

    const store = createStore(rootReducer)

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.beginAdTypeCreate())

    store.dispatch(act.cancelAdType())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numAdTypes)

})

it('reducer: ad_types should handle action: cancelAdType after beginAdTypeDelete', () => {

    const store = createStore(rootReducer)

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.selectAdType(2))
    store.dispatch(act.beginAdTypeDelete())
    store.dispatch(act.cancelAdType())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numAdTypes)

})

it('reducer: ad_types should handle action: cancelAdType after beginAdTypeDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.beginAdTypeDuplicate())
    store.dispatch(act.cancelAdType())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numAdTypes)

})

it('reducer: ad_types should handle action: saveAdTypeCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))
    store.dispatch(act.beginAdTypeEdit())
    store.dispatch(act.saveAdTypeCompleted())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: ad_types should handle action: saveAdTypeCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))
    store.dispatch(act.beginAdTypeDuplicate())
    store.dispatch(act.saveAdTypeCompleted(99))

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: ad_types should handle action: saveAdTypeCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginAdTypeCreate())
    store.dispatch(act.saveAdTypeCompleted(99))

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: ad_types should handle action: deleteAdTypeCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numAdTypes = store
        .getState()['ad_types']
        .get('list')
        .count()

    store.dispatch(act.deleteAdTypeCompleted())

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numAdTypes - 1)

})

it('reducer: ad_types should handle action: loadAdTypeListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectAdType(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginAdTypeDelete())
    store.dispatch(act.loadAdTypeListCompleted(newList))

    const newState = store.getState()['ad_types']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: ad_types should handle action: loadAdTypeReferenceCompleted', () => {

    const store = createStore(rootReducer)

    const newData = [
        {
            id: 1,
            display: 'foo'
        }, {
            id: 2,
            display: 'bar'
        }
    ]
    
    store.dispatch(act.loadAdTypeReferenceCompleted(newData))

    const newState = store.getState()['ad_types']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})