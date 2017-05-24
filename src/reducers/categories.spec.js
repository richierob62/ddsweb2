import { createStore } from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'


it('should return the initial state', () => {
    expect(root_reducer(undefined, {})).toBeDefined()
})

it('reducer: categories should handle action: selectCategory', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectCategory(2))
    const newState = store.getState()['categories']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: categories should handle action: selectCategoryTab', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectCategoryTab('foo'))
    const newState = store.getState()['categories']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: categories should handle action: changeCategoryData', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCategoryData(newData))

    const newState = store.getState()['categories']
    const field = newState.get('list').find( (item) => item.get('id') === 2 ).get('code')
    expect(field).toEqual('foo')

})

it('reducer: categories should handle action: changeCategoryFilter', () => {

    const store = createStore(root_reducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCategoryFilter(newData))

    const newState = store.getState()['categories']
    const filter = newState.get('current_filters').toJS()
    expect(filter).toEqual({"code": "foo"})


    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeCategoryFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['categories']
    const filter_2 = newState_2.get('current_filters').toJS()
    expect(filter_2).toEqual({"code": "foo", "hello" : "dolly"})

})

it('reducer: categories should handle action: changeCategorySort', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.changeCategorySort('foo'))

    const newState = store.getState()['categories']
    const sort = newState.get('current_sort').toJS()
    expect(sort).toEqual({ field_name: 'foo', direction: 'ASC'})

})

it('reducer: categories should handle action: beginCategoryEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    store.dispatch(act.beginCategoryEdit())

    const newState = store.getState()['categories']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: categories should handle action: beginCategoryCreate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const numCategories = store.getState()['categories'].get('list').count()

    store.dispatch(act.beginCategoryCreate())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numCategories + 1)

})

it('reducer: categories should handle action: beginCategoryDelete', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    store.dispatch(act.beginCategoryDelete())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: categories should handle action: beginCategoryDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const numCategories = store.getState()['categories'].get('list').count()

    store.dispatch(act.beginCategoryDuplicate())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id')).not.toEqual(2)
    expect(newState.get('list').count()).toEqual(numCategories + 1)

})

it('reducer: categories should handle action: cancelCategory after beginCategoryEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const original_val = store.getState()['categories'].get('list').find( (item) => item.get('id') === 2 ).get('code')

    store.dispatch(act.beginCategoryEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCategoryData(newData))
    store.dispatch(act.cancelCategory())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find( (item) => item.get('id') === 2 ).get('code')).toEqual(original_val)

})

it('reducer: categories should handle action: cancelCategory after beginCategoryCreate', () => {

    const store = createStore(root_reducer)

    const numCategories = store.getState()['categories'].get('list').count()

    store.dispatch(act.beginCategoryCreate())

    store.dispatch(act.cancelCategory())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCategories)

})

it('reducer: categories should handle action: cancelCategory after beginCategoryDelete', () => {

    const store = createStore(root_reducer)

    const numCategories = store.getState()['categories'].get('list').count()
    
    store.dispatch(act.selectCategory(2))
    store.dispatch(act.beginCategoryDelete())
    store.dispatch(act.cancelCategory())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numCategories)

})

it('reducer: categories should handle action: cancelCategory after beginCategoryDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const numCategories = store.getState()['categories'].get('list').count()

    store.dispatch(act.beginCategoryDuplicate())
    store.dispatch(act.cancelCategory())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCategories)    

})

it('reducer: categories should handle action: saveCategoryCompleted in mode: edit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))
    store.dispatch(act.beginCategoryEdit())
    store.dispatch(act.saveCategoryCompleted())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: categories should handle action: saveCategoryCompleted in mode: duplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))
    store.dispatch(act.beginCategoryDuplicate())
    store.dispatch(act.saveCategoryCompleted(99))

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: categories should handle action: saveCategoryCompleted in mode: new', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.beginCategoryCreate())
    store.dispatch(act.saveCategoryCompleted(99))

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: categories should handle action: deleteCategoryCompleted in mode: delete', () => {

    const store = createStore(root_reducer)

    const numCategories = store.getState()['categories'].get('list').count()

    store.dispatch(act.deleteCategoryCompleted())

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCategories -1 )  

})

it('reducer: categories should handle action: loadCategoryListCompleted', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCategory(2))

    const newList =  [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
    ]       

    store.dispatch(act.beginCategoryDelete())
    store.dispatch(act.loadCategoryListCompleted(newList))

    const newState = store.getState()['categories']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)  

})

it('reducer: categories should handle action: loadCategoryReferenceCompleted', () => {

    const store = createStore(root_reducer)

    const newData =  [
        { id: 1, display: 'foo' },
        { id: 2, display: 'bar' },
    ]       

    store.dispatch(act.loadCategoryReferenceCompleted(newData))

    const newState = store.getState()['categories']

    expect(newState.get('ref_list').count()).toEqual(2)  
    expect(newState.get('ref_list').toJS()).toEqual(newData)  


})