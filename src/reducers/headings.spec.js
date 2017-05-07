import { createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: headings should handle action: selectHeading', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectHeading(2))
    const newState = store.getState()['headings']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: headings should handle action: selectHeadingTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectHeadingTab('foo'))
    const newState = store.getState()['headings']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: headings should handle action: changeHeadingData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const newData = {
        field: 'name',
        value: 'foo'
    }

    store.dispatch(act.changeHeadingData(newData))

    const newState = store.getState()['headings']
    const field = newState.get('list').find( (item) => item.get('id') === 2 ).get('name')
    expect(field).toEqual('foo')

})

it('reducer: headings should handle action: changeHeadingFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'name',
        value: 'foo'
    }

    store.dispatch(act.changeHeadingFilter(newData))

    const newState = store.getState()['headings']
    const filter = newState.get('current_filters').toJS()
    expect(filter).toEqual({"name": "foo"})


    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeHeadingFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['headings']
    const filter_2 = newState_2.get('current_filters').toJS()
    expect(filter_2).toEqual({"name": "foo", "hello" : "dolly"})

})

it('reducer: headings should handle action: changeHeadingSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeHeadingSort('foo'))

    const newState = store.getState()['headings']
    const sort = newState.get('current_sort').toJS()
    expect(sort).toEqual({ field_name: 'foo', direction: 'ASC'})

})

it('reducer: headings should handle action: beginHeadingEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    store.dispatch(act.beginHeadingEdit())

    const newState = store.getState()['headings']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: headings should handle action: beginHeadingCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const numHeadings = store.getState()['headings'].get('list').count()

    store.dispatch(act.beginHeadingCreate())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numHeadings + 1)

})

it('reducer: headings should handle action: beginHeadingDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    store.dispatch(act.beginHeadingDelete())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: headings should handle action: beginHeadingDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const numHeadings = store.getState()['headings'].get('list').count()

    store.dispatch(act.beginHeadingDuplicate())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numHeadings + 1)

})

it('reducer: headings should handle action: cancelHeading after beginHeadingEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const original_val = store.getState()['headings'].get('list').find( (item) => item.get('id') === 2 ).get('name')

    store.dispatch(act.beginHeadingEdit())

    const newData = {
        field: 'name',
        value: 'foo'
    }

    store.dispatch(act.changeHeadingData(newData))
    store.dispatch(act.cancelHeading())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find( (item) => item.get('id') === 2 ).get('name')).toEqual(original_val)

})

it('reducer: headings should handle action: cancelHeading after beginHeadingCreate', () => {

    const store = createStore(rootReducer)

    const numHeadings = store.getState()['headings'].get('list').count()

    store.dispatch(act.beginHeadingCreate())

    store.dispatch(act.cancelHeading())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numHeadings)

})

it('reducer: headings should handle action: cancelHeading after beginHeadingDelete', () => {

    const store = createStore(rootReducer)

    const numHeadings = store.getState()['headings'].get('list').count()
    
    store.dispatch(act.selectHeading(2))
    store.dispatch(act.beginHeadingDelete())
    store.dispatch(act.cancelHeading())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numHeadings)

})

it('reducer: headings should handle action: cancelHeading after beginHeadingDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const numHeadings = store.getState()['headings'].get('list').count()

    store.dispatch(act.beginHeadingDuplicate())
    store.dispatch(act.cancelHeading())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numHeadings)    

})

it('reducer: headings should handle action: saveHeadingCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))
    store.dispatch(act.beginHeadingEdit())
    store.dispatch(act.saveHeadingCompleted())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: headings should handle action: saveHeadingCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))
    store.dispatch(act.beginHeadingDuplicate())
    store.dispatch(act.saveHeadingCompleted(99))

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: headings should handle action: saveHeadingCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginHeadingCreate())
    store.dispatch(act.saveHeadingCompleted(99))

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: headings should handle action: deleteHeadingCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numHeadings = store.getState()['headings'].get('list').count()

    store.dispatch(act.deleteHeadingCompleted())

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numHeadings -1 )  

})

it('reducer: headings should handle action: loadHeadingListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectHeading(2))

    const newList =  [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
    ]       

    store.dispatch(act.beginHeadingDelete())
    store.dispatch(act.loadHeadingListCompleted(newList))

    const newState = store.getState()['headings']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)  

})

it('reducer: headings should handle action: loadHeadingReferenceCompleted', () => {

    const store = createStore(rootReducer)

    const newData =  [
        { id: 1, display: 'foo' },
        { id: 2, display: 'bar' },
    ]       

    store.dispatch(act.loadHeadingReferenceCompleted(newData))

    const newState = store.getState()['headings']

    expect(newState.get('ref_list').count()).toEqual(2)  
    expect(newState.get('ref_list').toJS()).toEqual(newData)  


})