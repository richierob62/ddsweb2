import {createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: udacs should handle action: selectUdac', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectUdac(2))
    const newState = store.getState()['udacs']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: udacs should handle action: selectUdacTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectUdacTab('foo'))
    const newState = store.getState()['udacs']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: udacs should handle action: changeUdacData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeUdacData(newData))

    const newState = store.getState()['udacs']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: udacs should handle action: changeUdacFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeUdacFilter(newData))

    const newState = store.getState()['udacs']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeUdacFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['udacs']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: udacs should handle action: changeUdacSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeUdacSort('foo'))

    const newState = store.getState()['udacs']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: udacs should handle action: beginUdacEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    store.dispatch(act.beginUdacEdit())

    const newState = store.getState()['udacs']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: udacs should handle action: beginUdacCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.beginUdacCreate())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numUdacs + 1)

})

it('reducer: udacs should handle action: beginUdacDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    store.dispatch(act.beginUdacDelete())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: udacs should handle action: beginUdacDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.beginUdacDuplicate())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numUdacs + 1)

})

it('reducer: udacs should handle action: cancelUdac after beginUdacEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const original_val = store
        .getState()['udacs']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginUdacEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeUdacData(newData))
    store.dispatch(act.cancelUdac())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: udacs should handle action: cancelUdac after beginUdacCreate', () => {

    const store = createStore(rootReducer)

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.beginUdacCreate())

    store.dispatch(act.cancelUdac())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numUdacs)

})

it('reducer: udacs should handle action: cancelUdac after beginUdacDelete', () => {

    const store = createStore(rootReducer)

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.selectUdac(2))
    store.dispatch(act.beginUdacDelete())
    store.dispatch(act.cancelUdac())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numUdacs)

})

it('reducer: udacs should handle action: cancelUdac after beginUdacDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.beginUdacDuplicate())
    store.dispatch(act.cancelUdac())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numUdacs)

})

it('reducer: udacs should handle action: saveUdacCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))
    store.dispatch(act.beginUdacEdit())
    store.dispatch(act.saveUdacCompleted())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: udacs should handle action: saveUdacCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))
    store.dispatch(act.beginUdacDuplicate())
    store.dispatch(act.saveUdacCompleted(99))

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: udacs should handle action: saveUdacCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginUdacCreate())
    store.dispatch(act.saveUdacCompleted(99))

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: udacs should handle action: deleteUdacCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numUdacs = store
        .getState()['udacs']
        .get('list')
        .count()

    store.dispatch(act.deleteUdacCompleted())

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numUdacs - 1)

})

it('reducer: udacs should handle action: loadUdacListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectUdac(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginUdacDelete())
    store.dispatch(act.loadUdacListCompleted(newList))

    const newState = store.getState()['udacs']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: udacs should handle action: loadUdacReferenceCompleted', () => {

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
    
    store.dispatch(act.loadUdacReferenceCompleted(newData))

    const newState = store.getState()['udacs']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})