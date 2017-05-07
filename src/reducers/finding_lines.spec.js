import { createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: finding_lines should handle action: selectFindingLine', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectFindingLine(2))
    const newState = store.getState()['finding_lines']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: finding_lines should handle action: selectFindingLineTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectFindingLineTab('foo'))
    const newState = store.getState()['finding_lines']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: finding_lines should handle action: changeFindingLineData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFindingLineData(newData))

    const newState = store.getState()['finding_lines']
    const field = newState.get('list').find( (item) => item.get('id') === 2 ).get('code')
    expect(field).toEqual('foo')

})

it('reducer: finding_lines should handle action: changeFindingLineFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFindingLineFilter(newData))

    const newState = store.getState()['finding_lines']
    const filter = newState.get('current_filters').toJS()
    expect(filter).toEqual({"code": "foo"})


    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeFindingLineFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['finding_lines']
    const filter_2 = newState_2.get('current_filters').toJS()
    expect(filter_2).toEqual({"code": "foo", "hello" : "dolly"})

})

it('reducer: finding_lines should handle action: changeFindingLineSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeFindingLineSort('foo'))

    const newState = store.getState()['finding_lines']
    const sort = newState.get('current_sort').toJS()
    expect(sort).toEqual({ field_name: 'foo', direction: 'ASC'})

})

it('reducer: finding_lines should handle action: beginFindingLineEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    store.dispatch(act.beginFindingLineEdit())

    const newState = store.getState()['finding_lines']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: finding_lines should handle action: beginFindingLineCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const numFindingLines = store.getState()['finding_lines'].get('list').count()

    store.dispatch(act.beginFindingLineCreate())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numFindingLines + 1)

})

it('reducer: finding_lines should handle action: beginFindingLineDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    store.dispatch(act.beginFindingLineDelete())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: finding_lines should handle action: beginFindingLineDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const numFindingLines = store.getState()['finding_lines'].get('list').count()

    store.dispatch(act.beginFindingLineDuplicate())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numFindingLines + 1)

})

it('reducer: finding_lines should handle action: cancelFindingLine after beginFindingLineEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const original_val = store.getState()['finding_lines'].get('list').find( (item) => item.get('id') === 2 ).get('code')

    store.dispatch(act.beginFindingLineEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeFindingLineData(newData))
    store.dispatch(act.cancelFindingLine())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find( (item) => item.get('id') === 2 ).get('code')).toEqual(original_val)

})

it('reducer: finding_lines should handle action: cancelFindingLine after beginFindingLineCreate', () => {

    const store = createStore(rootReducer)

    const numFindingLines = store.getState()['finding_lines'].get('list').count()

    store.dispatch(act.beginFindingLineCreate())

    store.dispatch(act.cancelFindingLine())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFindingLines)

})

it('reducer: finding_lines should handle action: cancelFindingLine after beginFindingLineDelete', () => {

    const store = createStore(rootReducer)

    const numFindingLines = store.getState()['finding_lines'].get('list').count()
    
    store.dispatch(act.selectFindingLine(2))
    store.dispatch(act.beginFindingLineDelete())
    store.dispatch(act.cancelFindingLine())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numFindingLines)

})

it('reducer: finding_lines should handle action: cancelFindingLine after beginFindingLineDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const numFindingLines = store.getState()['finding_lines'].get('list').count()

    store.dispatch(act.beginFindingLineDuplicate())
    store.dispatch(act.cancelFindingLine())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFindingLines)    

})

it('reducer: finding_lines should handle action: saveFindingLineCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))
    store.dispatch(act.beginFindingLineEdit())
    store.dispatch(act.saveFindingLineCompleted())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: finding_lines should handle action: saveFindingLineCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))
    store.dispatch(act.beginFindingLineDuplicate())
    store.dispatch(act.saveFindingLineCompleted(99))

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: finding_lines should handle action: saveFindingLineCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginFindingLineCreate())
    store.dispatch(act.saveFindingLineCompleted(99))

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: finding_lines should handle action: deleteFindingLineCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numFindingLines = store.getState()['finding_lines'].get('list').count()

    store.dispatch(act.deleteFindingLineCompleted())

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numFindingLines -1 )  

})

it('reducer: finding_lines should handle action: loadFindingLineListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectFindingLine(2))

    const newList =  [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
    ]       

    store.dispatch(act.beginFindingLineDelete())
    store.dispatch(act.loadFindingLineListCompleted(newList))

    const newState = store.getState()['finding_lines']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)  

})

it('reducer: finding_lines should handle action: loadFindingLineReferenceCompleted', () => {

    const store = createStore(rootReducer)

    const newData =  [
        { id: 1, display: 'foo' },
        { id: 2, display: 'bar' },
    ]       

    store.dispatch(act.loadFindingLineReferenceCompleted(newData))

    const newState = store.getState()['finding_lines']

    expect(newState.get('ref_list').count()).toEqual(2)  
    expect(newState.get('ref_list').toJS()).toEqual(newData)  


})