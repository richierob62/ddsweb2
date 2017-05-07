import {createStore} from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'

it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: order_statuses should handle action: selectOrderStatus', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectOrderStatus(2))
    const newState = store.getState()['order_statuses']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: order_statuses should handle action: selectOrderStatusTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectOrderStatusTab('foo'))
    const newState = store.getState()['order_statuses']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: order_statuses should handle action: changeOrderStatusData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderStatusData(newData))

    const newState = store.getState()['order_statuses']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: order_statuses should handle action: changeOrderStatusFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderStatusFilter(newData))

    const newState = store.getState()['order_statuses']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeOrderStatusFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['order_statuses']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: order_statuses should handle action: changeOrderStatusSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeOrderStatusSort('foo'))

    const newState = store.getState()['order_statuses']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: order_statuses should handle action: beginOrderStatusEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    store.dispatch(act.beginOrderStatusEdit())

    const newState = store.getState()['order_statuses']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: order_statuses should handle action: beginOrderStatusCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.beginOrderStatusCreate())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderStatuss + 1)

})

it('reducer: order_statuses should handle action: beginOrderStatusDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    store.dispatch(act.beginOrderStatusDelete())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: order_statuses should handle action: beginOrderStatusDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.beginOrderStatusDuplicate())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderStatuss + 1)

})

it('reducer: order_statuses should handle action: cancelOrderStatus after beginOrderStatusEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const original_val = store
        .getState()['order_statuses']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginOrderStatusEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderStatusData(newData))
    store.dispatch(act.cancelOrderStatus())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: order_statuses should handle action: cancelOrderStatus after beginOrderStatusCreate', () => {

    const store = createStore(rootReducer)

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.beginOrderStatusCreate())

    store.dispatch(act.cancelOrderStatus())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderStatuss)

})

it('reducer: order_statuses should handle action: cancelOrderStatus after beginOrderStatusDelete', () => {

    const store = createStore(rootReducer)

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.selectOrderStatus(2))
    store.dispatch(act.beginOrderStatusDelete())
    store.dispatch(act.cancelOrderStatus())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderStatuss)

})

it('reducer: order_statuses should handle action: cancelOrderStatus after beginOrderStatusDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.beginOrderStatusDuplicate())
    store.dispatch(act.cancelOrderStatus())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderStatuss)

})

it('reducer: order_statuses should handle action: saveOrderStatusCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))
    store.dispatch(act.beginOrderStatusEdit())
    store.dispatch(act.saveOrderStatusCompleted())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: order_statuses should handle action: saveOrderStatusCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))
    store.dispatch(act.beginOrderStatusDuplicate())
    store.dispatch(act.saveOrderStatusCompleted(99))

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: order_statuses should handle action: saveOrderStatusCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginOrderStatusCreate())
    store.dispatch(act.saveOrderStatusCompleted(99))

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: order_statuses should handle action: deleteOrderStatusCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numOrderStatuss = store
        .getState()['order_statuses']
        .get('list')
        .count()

    store.dispatch(act.deleteOrderStatusCompleted())

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderStatuss - 1)

})

it('reducer: order_statuses should handle action: loadOrderStatusListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrderStatus(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginOrderStatusDelete())
    store.dispatch(act.loadOrderStatusListCompleted(newList))

    const newState = store.getState()['order_statuses']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: order_statuses should handle action: loadOrderStatusReferenceCompleted', () => {

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
    
    store.dispatch(act.loadOrderStatusReferenceCompleted(newData))

    const newState = store.getState()['order_statuses']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})