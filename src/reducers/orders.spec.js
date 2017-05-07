import {createStore} from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: orders should handle action: selectOrder', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectOrder(2))
    const newState = store.getState()['orders']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: orders should handle action: selectOrderTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectOrderTab('foo'))
    const newState = store.getState()['orders']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: orders should handle action: changeOrderData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderData(newData))

    const newState = store.getState()['orders']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: orders should handle action: changeOrderFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderFilter(newData))

    const newState = store.getState()['orders']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeOrderFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['orders']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: orders should handle action: changeOrderSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeOrderSort('foo'))

    const newState = store.getState()['orders']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: orders should handle action: beginOrderEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    store.dispatch(act.beginOrderEdit())

    const newState = store.getState()['orders']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: orders should handle action: beginOrderCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.beginOrderCreate())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrders + 1)

})

it('reducer: orders should handle action: beginOrderDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    store.dispatch(act.beginOrderDelete())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: orders should handle action: beginOrderDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.beginOrderDuplicate())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrders + 1)

})

it('reducer: orders should handle action: cancelOrder after beginOrderEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const original_val = store
        .getState()['orders']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginOrderEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderData(newData))
    store.dispatch(act.cancelOrder())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: orders should handle action: cancelOrder after beginOrderCreate', () => {

    const store = createStore(rootReducer)

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.beginOrderCreate())

    store.dispatch(act.cancelOrder())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrders)

})

it('reducer: orders should handle action: cancelOrder after beginOrderDelete', () => {

    const store = createStore(rootReducer)

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.selectOrder(2))
    store.dispatch(act.beginOrderDelete())
    store.dispatch(act.cancelOrder())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrders)

})

it('reducer: orders should handle action: cancelOrder after beginOrderDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.beginOrderDuplicate())
    store.dispatch(act.cancelOrder())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrders)

})

it('reducer: orders should handle action: saveOrderCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))
    store.dispatch(act.beginOrderEdit())
    store.dispatch(act.saveOrderCompleted())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: orders should handle action: saveOrderCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))
    store.dispatch(act.beginOrderDuplicate())
    store.dispatch(act.saveOrderCompleted(99))

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: orders should handle action: saveOrderCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginOrderCreate())
    store.dispatch(act.saveOrderCompleted(99))

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: orders should handle action: deleteOrderCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numOrders = store
        .getState()['orders']
        .get('list')
        .count()

    store.dispatch(act.deleteOrderCompleted())

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrders - 1)

})

it('reducer: orders should handle action: loadOrderListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectOrder(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginOrderDelete())
    store.dispatch(act.loadOrderListCompleted(newList))

    const newState = store.getState()['orders']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: orders should handle action: loadOrderReferenceCompleted', () => {

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
    
    store.dispatch(act.loadOrderReferenceCompleted(newData))

    const newState = store.getState()['orders']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})