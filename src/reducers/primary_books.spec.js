import {createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: primary_books should handle action: selectPrimaryBook', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectPrimaryBook(2))
    const newState = store.getState()['primary_books']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: primary_books should handle action: selectPrimaryBookTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectPrimaryBookTab('foo'))
    const newState = store.getState()['primary_books']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: primary_books should handle action: changePrimaryBookData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePrimaryBookData(newData))

    const newState = store.getState()['primary_books']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: primary_books should handle action: changePrimaryBookFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePrimaryBookFilter(newData))

    const newState = store.getState()['primary_books']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changePrimaryBookFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['primary_books']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: primary_books should handle action: changePrimaryBookSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changePrimaryBookSort('foo'))

    const newState = store.getState()['primary_books']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: primary_books should handle action: beginPrimaryBookEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    store.dispatch(act.beginPrimaryBookEdit())

    const newState = store.getState()['primary_books']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: primary_books should handle action: beginPrimaryBookCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.beginPrimaryBookCreate())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks + 1)

})

it('reducer: primary_books should handle action: beginPrimaryBookDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    store.dispatch(act.beginPrimaryBookDelete())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: primary_books should handle action: beginPrimaryBookDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.beginPrimaryBookDuplicate())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks + 1)

})

it('reducer: primary_books should handle action: cancelPrimaryBook after beginPrimaryBookEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const original_val = store
        .getState()['primary_books']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginPrimaryBookEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePrimaryBookData(newData))
    store.dispatch(act.cancelPrimaryBook())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: primary_books should handle action: cancelPrimaryBook after beginPrimaryBookCreate', () => {

    const store = createStore(rootReducer)

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.beginPrimaryBookCreate())

    store.dispatch(act.cancelPrimaryBook())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks)

})

it('reducer: primary_books should handle action: cancelPrimaryBook after beginPrimaryBookDelete', () => {

    const store = createStore(rootReducer)

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.selectPrimaryBook(2))
    store.dispatch(act.beginPrimaryBookDelete())
    store.dispatch(act.cancelPrimaryBook())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks)

})

it('reducer: primary_books should handle action: cancelPrimaryBook after beginPrimaryBookDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.beginPrimaryBookDuplicate())
    store.dispatch(act.cancelPrimaryBook())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks)

})

it('reducer: primary_books should handle action: savePrimaryBookCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))
    store.dispatch(act.beginPrimaryBookEdit())
    store.dispatch(act.savePrimaryBookCompleted())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: primary_books should handle action: savePrimaryBookCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))
    store.dispatch(act.beginPrimaryBookDuplicate())
    store.dispatch(act.savePrimaryBookCompleted(99))

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: primary_books should handle action: savePrimaryBookCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginPrimaryBookCreate())
    store.dispatch(act.savePrimaryBookCompleted(99))

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: primary_books should handle action: deletePrimaryBookCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numPrimaryBooks = store
        .getState()['primary_books']
        .get('list')
        .count()

    store.dispatch(act.deletePrimaryBookCompleted())

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPrimaryBooks - 1)

})

it('reducer: primary_books should handle action: loadPrimaryBookListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPrimaryBook(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginPrimaryBookDelete())
    store.dispatch(act.loadPrimaryBookListCompleted(newList))

    const newState = store.getState()['primary_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: primary_books should handle action: loadPrimaryBookReferenceCompleted', () => {

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
    
    store.dispatch(act.loadPrimaryBookReferenceCompleted(newData))

    const newState = store.getState()['primary_books']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})