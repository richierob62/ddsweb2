import {createStore } from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'

it('should return the initial state', () => {
    expect(root_reducer(undefined, {})).toBeDefined()
})

it('reducer: order_lines should handle action: selectOrderLine', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectOrderLine(2))
    const newState = store.getState()['order_lines']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: order_lines should handle action: selectOrderLineTab', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectOrderLineTab('foo'))
    const newState = store.getState()['order_lines']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: order_lines should handle action: changeOrderLineData', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderLineData(newData))

    const newState = store.getState()['order_lines']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: order_lines should handle action: changeOrderLineFilter', () => {

    const store = createStore(root_reducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderLineFilter(newData))

    const newState = store.getState()['order_lines']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeOrderLineFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['order_lines']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: order_lines should handle action: changeOrderLineSort', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.changeOrderLineSort('foo'))

    const newState = store.getState()['order_lines']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: order_lines should handle action: beginOrderLineEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    store.dispatch(act.beginOrderLineEdit())

    const newState = store.getState()['order_lines']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: order_lines should handle action: beginOrderLineCreate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.beginOrderLineCreate())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderLines + 1)

})

it('reducer: order_lines should handle action: beginOrderLineDelete', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    store.dispatch(act.beginOrderLineDelete())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: order_lines should handle action: beginOrderLineDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.beginOrderLineDuplicate())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderLines + 1)

})

it('reducer: order_lines should handle action: cancelOrderLine after beginOrderLineEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const original_val = store
        .getState()['order_lines']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginOrderLineEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeOrderLineData(newData))
    store.dispatch(act.cancelOrderLine())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: order_lines should handle action: cancelOrderLine after beginOrderLineCreate', () => {

    const store = createStore(root_reducer)

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.beginOrderLineCreate())

    store.dispatch(act.cancelOrderLine())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderLines)

})

it('reducer: order_lines should handle action: cancelOrderLine after beginOrderLineDelete', () => {

    const store = createStore(root_reducer)

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.selectOrderLine(2))
    store.dispatch(act.beginOrderLineDelete())
    store.dispatch(act.cancelOrderLine())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numOrderLines)

})

it('reducer: order_lines should handle action: cancelOrderLine after beginOrderLineDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.beginOrderLineDuplicate())
    store.dispatch(act.cancelOrderLine())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderLines)

})

it('reducer: order_lines should handle action: saveOrderLineCompleted in mode: edit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))
    store.dispatch(act.beginOrderLineEdit())
    store.dispatch(act.saveOrderLineCompleted())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: order_lines should handle action: saveOrderLineCompleted in mode: duplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))
    store.dispatch(act.beginOrderLineDuplicate())
    store.dispatch(act.saveOrderLineCompleted(99))

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: order_lines should handle action: saveOrderLineCompleted in mode: new', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.beginOrderLineCreate())
    store.dispatch(act.saveOrderLineCompleted(99))

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: order_lines should handle action: deleteOrderLineCompleted in mode: delete', () => {

    const store = createStore(root_reducer)

    const numOrderLines = store
        .getState()['order_lines']
        .get('list')
        .count()

    store.dispatch(act.deleteOrderLineCompleted())

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numOrderLines - 1)

})

it('reducer: order_lines should handle action: loadOrderLineListCompleted', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectOrderLine(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginOrderLineDelete())
    store.dispatch(act.loadOrderLineListCompleted(newList))

    const newState = store.getState()['order_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: order_lines should handle action: loadOrderLineReferenceCompleted', () => {

    const store = createStore(root_reducer)

    const newData = [
        {
            id: 1,
            display: 'foo'
        }, {
            id: 2,
            display: 'bar'
        }
    ]
    
    store.dispatch(act.loadOrderLineReferenceCompleted(newData))

    const newState = store.getState()['order_lines']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})