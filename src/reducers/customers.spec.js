import { createStore, combineReducers } from 'redux'
import act from '../actions/'
import customers from './customers'

const rootReducer = combineReducers({ customers })


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: customers should handle action: selectCustomer', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectCustomer(2))
    const newState = store.getState()['customers']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: customers should handle action: selectCustomerTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectCustomerTab('foo'))
    const newState = store.getState()['customers']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: customers should handle action: changeCustomerData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const newData = {
        field: 'account_num',
        value: 'foo'
    }

    store.dispatch(act.changeCustomerData(newData))

    const newState = store.getState()['customers']
    const field = newState.get('list').find( (item) => item.get('id') === 2 ).get('account_num')
    expect(field).toEqual('foo')

})

it('reducer: customers should handle action: changeCustomerFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'account_num',
        value: 'foo'
    }

    store.dispatch(act.changeCustomerFilter(newData))

    const newState = store.getState()['customers']
    const filter = newState.get('current_filters').toJS()
    expect(filter).toEqual({"account_num": "foo"})


    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeCustomerFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['customers']
    const filter_2 = newState_2.get('current_filters').toJS()
    expect(filter_2).toEqual({"account_num": "foo", "hello" : "dolly"})

})

it('reducer: customers should handle action: changeCustomerSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeCustomerSort('foo'))

    const newState = store.getState()['customers']
    const sort = newState.get('current_sort').toJS()
    expect(sort).toEqual({ field_name: 'foo', direction: 'ASC'})

})

it('reducer: customers should handle action: beginCustomerEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    store.dispatch(act.beginCustomerEdit())

    const newState = store.getState()['customers']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: customers should handle action: beginCustomerCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const numCustomers = store.getState()['customers'].get('list').count()

    store.dispatch(act.beginCustomerCreate())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numCustomers + 1)

})

it('reducer: customers should handle action: beginCustomerDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    store.dispatch(act.beginCustomerDelete())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: customers should handle action: beginCustomerDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const numCustomers = store.getState()['customers'].get('list').count()

    store.dispatch(act.beginCustomerDuplicate())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numCustomers + 1)

})

it('reducer: customers should handle action: cancelCustomer after beginCustomerEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const original_val = store.getState()['customers'].get('list').find( (item) => item.get('id') === 2 ).get('account_num')

    store.dispatch(act.beginCustomerEdit())

    const newData = {
        field: 'account_num',
        value: 'foo'
    }

    store.dispatch(act.changeCustomerData(newData))
    store.dispatch(act.cancelCustomer())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find( (item) => item.get('id') === 2 ).get('account_num')).toEqual(original_val)

})

it('reducer: customers should handle action: cancelCustomer after beginCustomerCreate', () => {

    const store = createStore(rootReducer)

    const numCustomers = store.getState()['customers'].get('list').count()

    store.dispatch(act.beginCustomerCreate())

    store.dispatch(act.cancelCustomer())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCustomers)

})

it('reducer: customers should handle action: cancelCustomer after beginCustomerDelete', () => {

    const store = createStore(rootReducer)

    const numCustomers = store.getState()['customers'].get('list').count()
    
    store.dispatch(act.selectCustomer(2))
    store.dispatch(act.beginCustomerDelete())
    store.dispatch(act.cancelCustomer())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numCustomers)

})

it('reducer: customers should handle action: cancelCustomer after beginCustomerDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const numCustomers = store.getState()['customers'].get('list').count()

    store.dispatch(act.beginCustomerDuplicate())
    store.dispatch(act.cancelCustomer())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCustomers)    

})

it('reducer: customers should handle action: saveCustomerCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))
    store.dispatch(act.beginCustomerEdit())
    store.dispatch(act.saveCustomerCompleted())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: customers should handle action: saveCustomerCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))
    store.dispatch(act.beginCustomerDuplicate())
    store.dispatch(act.saveCustomerCompleted(99))

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: customers should handle action: saveCustomerCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginCustomerCreate())
    store.dispatch(act.saveCustomerCompleted(99))

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: customers should handle action: deleteCustomerCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numCustomers = store.getState()['customers'].get('list').count()

    store.dispatch(act.deleteCustomerCompleted())

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCustomers -1 )  

})

it('reducer: customers should handle action: loadCustomerListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectCustomer(2))

    const newList =  [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
    ]       

    store.dispatch(act.beginCustomerDelete())
    store.dispatch(act.loadCustomerListCompleted(newList))

    const newState = store.getState()['customers']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)  

})

it('reducer: customers should handle action: loadCustomerReferenceCompleted', () => {

    const store = createStore(rootReducer)

    const newData =  [
        { id: 1, display: 'foo' },
        { id: 2, display: 'bar' },
    ]       

    store.dispatch(act.loadCustomerReferenceCompleted(newData))

    const newState = store.getState()['customers']

    expect(newState.get('ref_list').count()).toEqual(2)  
    expect(newState.get('ref_list').toJS()).toEqual(newData)  


})