import { createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: fields should handle action: selectField', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectField(2))
    const newState = store.getState()['fields']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: fields should handle action: selectFieldTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectFieldTab('foo'))
    const newState = store.getState()['fields']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: fields should handle action: changeFieldData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFieldData(newData))

    const newState = store.getState()['fields']
    const field = newState.get('list').find( (item) => item.get('id') === 2 ).get('code')
    expect(field).toEqual('foo')

})

it('reducer: fields should handle action: changeFieldFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFieldFilter(newData))

    const newState = store.getState()['fields']
    const filter = newState.get('current_filters').toJS()
    expect(filter).toEqual({"code": "foo"})


    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeFieldFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['fields']
    const filter_2 = newState_2.get('current_filters').toJS()
    expect(filter_2).toEqual({"code": "foo", "hello" : "dolly"})

})

it('reducer: fields should handle action: changeFieldSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeFieldSort('foo'))

    const newState = store.getState()['fields']
    const sort = newState.get('current_sort').toJS()
    expect(sort).toEqual({ field_name: 'foo', direction: 'ASC'})

})

it('reducer: fields should handle action: beginFieldEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    store.dispatch(act.beginFieldEdit())

    const newState = store.getState()['fields']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: fields should handle action: beginFieldCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const numFields = store.getState()['fields'].get('list').count()

    store.dispatch(act.beginFieldCreate())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numFields + 1)

})

it('reducer: fields should handle action: beginFieldDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    store.dispatch(act.beginFieldDelete())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: fields should handle action: beginFieldDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const numFields = store.getState()['fields'].get('list').count()

    store.dispatch(act.beginFieldDuplicate())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numFields + 1)

})

it('reducer: fields should handle action: cancelField after beginFieldEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const original_val = store.getState()['fields'].get('list').find( (item) => item.get('id') === 2 ).get('code')

    store.dispatch(act.beginFieldEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFieldData(newData))
    store.dispatch(act.cancelField())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find( (item) => item.get('id') === 2 ).get('code')).toEqual(original_val)

})

it('reducer: fields should handle action: cancelField after beginFieldCreate', () => {

    const store = createStore(rootReducer)

    const numFields = store.getState()['fields'].get('list').count()

    store.dispatch(act.beginFieldCreate())

    store.dispatch(act.cancelField())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFields)

})

it('reducer: fields should handle action: cancelField after beginFieldDelete', () => {

    const store = createStore(rootReducer)

    const numFields = store.getState()['fields'].get('list').count()
    
    store.dispatch(act.selectField(2))
    store.dispatch(act.beginFieldDelete())
    store.dispatch(act.cancelField())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numFields)

})

it('reducer: fields should handle action: cancelField after beginFieldDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const numFields = store.getState()['fields'].get('list').count()

    store.dispatch(act.beginFieldDuplicate())
    store.dispatch(act.cancelField())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFields)    

})

it('reducer: fields should handle action: saveFieldCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))
    store.dispatch(act.beginFieldEdit())
    store.dispatch(act.saveFieldCompleted())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: fields should handle action: saveFieldCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))
    store.dispatch(act.beginFieldDuplicate())
    store.dispatch(act.saveFieldCompleted(99))

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: fields should handle action: saveFieldCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginFieldCreate())
    store.dispatch(act.saveFieldCompleted(99))

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: fields should handle action: deleteFieldCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numFields = store.getState()['fields'].get('list').count()

    store.dispatch(act.deleteFieldCompleted())

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFields -1 )  

})

it('reducer: fields should handle action: loadFieldListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectField(2))

    const newList =  [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
    ]       

    store.dispatch(act.beginFieldDelete())
    store.dispatch(act.loadFieldListCompleted(newList))

    const newState = store.getState()['fields']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)  

})

it('reducer: fields should handle action: loadFieldReferenceCompleted', () => {

    const store = createStore(rootReducer)

    const newData =  [
        { id: 1, display: 'foo' },
        { id: 2, display: 'bar' },
    ]       

    store.dispatch(act.loadFieldReferenceCompleted(newData))

    const newState = store.getState()['fields']

    expect(newState.get('ref_list').count()).toEqual(2)  
    expect(newState.get('ref_list').toJS()).toEqual(newData)  


})