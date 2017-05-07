import {createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: source_books should handle action: selectSourceBook', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectSourceBook(2))
    const newState = store.getState()['source_books']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: source_books should handle action: selectSourceBookTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectSourceBookTab('foo'))
    const newState = store.getState()['source_books']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: source_books should handle action: changeSourceBookData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSourceBookData(newData))

    const newState = store.getState()['source_books']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: source_books should handle action: changeSourceBookFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSourceBookFilter(newData))

    const newState = store.getState()['source_books']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeSourceBookFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['source_books']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: source_books should handle action: changeSourceBookSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changeSourceBookSort('foo'))

    const newState = store.getState()['source_books']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: source_books should handle action: beginSourceBookEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    store.dispatch(act.beginSourceBookEdit())

    const newState = store.getState()['source_books']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: source_books should handle action: beginSourceBookCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.beginSourceBookCreate())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numSourceBooks + 1)

})

it('reducer: source_books should handle action: beginSourceBookDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    store.dispatch(act.beginSourceBookDelete())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: source_books should handle action: beginSourceBookDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.beginSourceBookDuplicate())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numSourceBooks + 1)

})

it('reducer: source_books should handle action: cancelSourceBook after beginSourceBookEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const original_val = store
        .getState()['source_books']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginSourceBookEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeSourceBookData(newData))
    store.dispatch(act.cancelSourceBook())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: source_books should handle action: cancelSourceBook after beginSourceBookCreate', () => {

    const store = createStore(rootReducer)

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.beginSourceBookCreate())

    store.dispatch(act.cancelSourceBook())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSourceBooks)

})

it('reducer: source_books should handle action: cancelSourceBook after beginSourceBookDelete', () => {

    const store = createStore(rootReducer)

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.selectSourceBook(2))
    store.dispatch(act.beginSourceBookDelete())
    store.dispatch(act.cancelSourceBook())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numSourceBooks)

})

it('reducer: source_books should handle action: cancelSourceBook after beginSourceBookDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.beginSourceBookDuplicate())
    store.dispatch(act.cancelSourceBook())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSourceBooks)

})

it('reducer: source_books should handle action: saveSourceBookCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))
    store.dispatch(act.beginSourceBookEdit())
    store.dispatch(act.saveSourceBookCompleted())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: source_books should handle action: saveSourceBookCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))
    store.dispatch(act.beginSourceBookDuplicate())
    store.dispatch(act.saveSourceBookCompleted(99))

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: source_books should handle action: saveSourceBookCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginSourceBookCreate())
    store.dispatch(act.saveSourceBookCompleted(99))

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: source_books should handle action: deleteSourceBookCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numSourceBooks = store
        .getState()['source_books']
        .get('list')
        .count()

    store.dispatch(act.deleteSourceBookCompleted())

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numSourceBooks - 1)

})

it('reducer: source_books should handle action: loadSourceBookListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectSourceBook(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginSourceBookDelete())
    store.dispatch(act.loadSourceBookListCompleted(newList))

    const newState = store.getState()['source_books']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: source_books should handle action: loadSourceBookReferenceCompleted', () => {

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
    
    store.dispatch(act.loadSourceBookReferenceCompleted(newData))

    const newState = store.getState()['source_books']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})