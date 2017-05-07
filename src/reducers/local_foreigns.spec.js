import {createStore} from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: local_foreigns should handle action: selectLocalForeign', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectLocalForeign(2))
    const newState = store.getState()['local_foreigns']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: local_foreigns should handle action: selectLocalForeignTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectLocalForeignTab('foo'))
    const newState = store.getState()['local_foreigns']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: local_foreigns should handle action: changeLocalForeignData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeLocalForeignData(newData))

    const newState = store.getState()['local_foreigns']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: local_foreigns should handle action: changeLocalForeignFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeLocalForeignFilter(newData))

    const newState = store.getState()['local_foreigns']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeLocalForeignFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['local_foreigns']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: local_foreigns should handle action: changeLocalForeignSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeLocalForeignSort('foo'))

    const newState = store.getState()['local_foreigns']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: local_foreigns should handle action: beginLocalForeignEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    store.dispatch(act.beginLocalForeignEdit())

    const newState = store.getState()['local_foreigns']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: local_foreigns should handle action: beginLocalForeignCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.beginLocalForeignCreate())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numLocalForeigns + 1)

})

it('reducer: local_foreigns should handle action: beginLocalForeignDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    store.dispatch(act.beginLocalForeignDelete())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: local_foreigns should handle action: beginLocalForeignDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.beginLocalForeignDuplicate())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numLocalForeigns + 1)

})

it('reducer: local_foreigns should handle action: cancelLocalForeign after beginLocalForeignEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const original_val = store
        .getState()['local_foreigns']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginLocalForeignEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeLocalForeignData(newData))
    store.dispatch(act.cancelLocalForeign())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: local_foreigns should handle action: cancelLocalForeign after beginLocalForeignCreate', () => {

    const store = createStore(rootReducer)

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.beginLocalForeignCreate())

    store.dispatch(act.cancelLocalForeign())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numLocalForeigns)

})

it('reducer: local_foreigns should handle action: cancelLocalForeign after beginLocalForeignDelete', () => {

    const store = createStore(rootReducer)

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.selectLocalForeign(2))
    store.dispatch(act.beginLocalForeignDelete())
    store.dispatch(act.cancelLocalForeign())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numLocalForeigns)

})

it('reducer: local_foreigns should handle action: cancelLocalForeign after beginLocalForeignDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.beginLocalForeignDuplicate())
    store.dispatch(act.cancelLocalForeign())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numLocalForeigns)

})

it('reducer: local_foreigns should handle action: saveLocalForeignCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))
    store.dispatch(act.beginLocalForeignEdit())
    store.dispatch(act.saveLocalForeignCompleted())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: local_foreigns should handle action: saveLocalForeignCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))
    store.dispatch(act.beginLocalForeignDuplicate())
    store.dispatch(act.saveLocalForeignCompleted(99))

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: local_foreigns should handle action: saveLocalForeignCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginLocalForeignCreate())
    store.dispatch(act.saveLocalForeignCompleted(99))

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: local_foreigns should handle action: deleteLocalForeignCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numLocalForeigns = store
        .getState()['local_foreigns']
        .get('list')
        .count()

    store.dispatch(act.deleteLocalForeignCompleted())

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numLocalForeigns - 1)

})

it('reducer: local_foreigns should handle action: loadLocalForeignListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectLocalForeign(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginLocalForeignDelete())
    store.dispatch(act.loadLocalForeignListCompleted(newList))

    const newState = store.getState()['local_foreigns']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: local_foreigns should handle action: loadLocalForeignReferenceCompleted', () => {

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
    
    store.dispatch(act.loadLocalForeignReferenceCompleted(newData))

    const newState = store.getState()['local_foreigns']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})