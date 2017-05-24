import {createStore } from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'


it('should return the initial state', () => {
    expect(root_reducer(undefined, {})).toBeDefined()
})

it('reducer: sales_reps should handle action: selectSalesRep', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectSalesRep(2))
    const newState = store.getState()['sales_reps']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: sales_reps should handle action: selectSalesRepTab', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectSalesRepTab('foo'))
    const newState = store.getState()['sales_reps']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: sales_reps should handle action: changeSalesRepData', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSalesRepData(newData))

    const newState = store.getState()['sales_reps']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: sales_reps should handle action: changeSalesRepFilter', () => {

    const store = createStore(root_reducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSalesRepFilter(newData))

    const newState = store.getState()['sales_reps']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeSalesRepFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['sales_reps']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: sales_reps should handle action: changeSalesRepSort', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.changeSalesRepSort('foo'))

    const newState = store.getState()['sales_reps']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: sales_reps should handle action: beginSalesRepEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    store.dispatch(act.beginSalesRepEdit())

    const newState = store.getState()['sales_reps']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: sales_reps should handle action: beginSalesRepCreate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.beginSalesRepCreate())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numSalesReps + 1)

})

it('reducer: sales_reps should handle action: beginSalesRepDelete', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    store.dispatch(act.beginSalesRepDelete())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: sales_reps should handle action: beginSalesRepDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.beginSalesRepDuplicate())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numSalesReps + 1)

})

it('reducer: sales_reps should handle action: cancelSalesRep after beginSalesRepEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const original_val = store
        .getState()['sales_reps']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginSalesRepEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSalesRepData(newData))
    store.dispatch(act.cancelSalesRep())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: sales_reps should handle action: cancelSalesRep after beginSalesRepCreate', () => {

    const store = createStore(root_reducer)

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.beginSalesRepCreate())

    store.dispatch(act.cancelSalesRep())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSalesReps)

})

it('reducer: sales_reps should handle action: cancelSalesRep after beginSalesRepDelete', () => {

    const store = createStore(root_reducer)

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.selectSalesRep(2))
    store.dispatch(act.beginSalesRepDelete())
    store.dispatch(act.cancelSalesRep())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numSalesReps)

})

it('reducer: sales_reps should handle action: cancelSalesRep after beginSalesRepDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.beginSalesRepDuplicate())
    store.dispatch(act.cancelSalesRep())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSalesReps)

})

it('reducer: sales_reps should handle action: saveSalesRepCompleted in mode: edit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))
    store.dispatch(act.beginSalesRepEdit())
    store.dispatch(act.saveSalesRepCompleted())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: sales_reps should handle action: saveSalesRepCompleted in mode: duplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))
    store.dispatch(act.beginSalesRepDuplicate())
    store.dispatch(act.saveSalesRepCompleted(99))

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: sales_reps should handle action: saveSalesRepCompleted in mode: new', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.beginSalesRepCreate())
    store.dispatch(act.saveSalesRepCompleted(99))

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: sales_reps should handle action: deleteSalesRepCompleted in mode: delete', () => {

    const store = createStore(root_reducer)

    const numSalesReps = store
        .getState()['sales_reps']
        .get('list')
        .count()

    store.dispatch(act.deleteSalesRepCompleted())

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSalesReps - 1)

})

it('reducer: sales_reps should handle action: loadSalesRepListCompleted', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectSalesRep(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginSalesRepDelete())
    store.dispatch(act.loadSalesRepListCompleted(newList))

    const newState = store.getState()['sales_reps']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: sales_reps should handle action: loadSalesRepReferenceCompleted', () => {

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
    
    store.dispatch(act.loadSalesRepReferenceCompleted(newData))

    const newState = store.getState()['sales_reps']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})