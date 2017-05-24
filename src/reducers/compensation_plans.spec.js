import {createStore} from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'

it('should return the initial state', () => {
    expect(root_reducer(undefined, {})).toBeDefined()
})

it('reducer: compensation_plans should handle action: selectCompensationPlan', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectCompensationPlan(2))
    const newState = store.getState()['compensation_plans']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: compensation_plans should handle action: selectCompensationPlanTab', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.selectCompensationPlanTab('foo'))
    const newState = store.getState()['compensation_plans']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: compensation_plans should handle action: changeCompensationPlanData', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCompensationPlanData(newData))

    const newState = store.getState()['compensation_plans']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: compensation_plans should handle action: changeCompensationPlanFilter', () => {

    const store = createStore(root_reducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCompensationPlanFilter(newData))

    const newState = store.getState()['compensation_plans']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changeCompensationPlanFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['compensation_plans']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: compensation_plans should handle action: changeCompensationPlanSort', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.changeCompensationPlanSort('foo'))

    const newState = store.getState()['compensation_plans']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: compensation_plans should handle action: beginCompensationPlanEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    store.dispatch(act.beginCompensationPlanEdit())

    const newState = store.getState()['compensation_plans']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: compensation_plans should handle action: beginCompensationPlanCreate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.beginCompensationPlanCreate())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numCompensationPlans + 1)

})

it('reducer: compensation_plans should handle action: beginCompensationPlanDelete', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    store.dispatch(act.beginCompensationPlanDelete())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: compensation_plans should handle action: beginCompensationPlanDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.beginCompensationPlanDuplicate())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numCompensationPlans + 1)

})

it('reducer: compensation_plans should handle action: cancelCompensationPlan after beginCompensationPlanEdit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const original_val = store
        .getState()['compensation_plans']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginCompensationPlanEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changeCompensationPlanData(newData))
    store.dispatch(act.cancelCompensationPlan())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: compensation_plans should handle action: cancelCompensationPlan after beginCompensationPlanCreate', () => {

    const store = createStore(root_reducer)

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.beginCompensationPlanCreate())

    store.dispatch(act.cancelCompensationPlan())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCompensationPlans)

})

it('reducer: compensation_plans should handle action: cancelCompensationPlan after beginCompensationPlanDelete', () => {

    const store = createStore(root_reducer)

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.selectCompensationPlan(2))
    store.dispatch(act.beginCompensationPlanDelete())
    store.dispatch(act.cancelCompensationPlan())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numCompensationPlans)

})

it('reducer: compensation_plans should handle action: cancelCompensationPlan after beginCompensationPlanDuplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.beginCompensationPlanDuplicate())
    store.dispatch(act.cancelCompensationPlan())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCompensationPlans)

})

it('reducer: compensation_plans should handle action: saveCompensationPlanCompleted in mode: edit', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))
    store.dispatch(act.beginCompensationPlanEdit())
    store.dispatch(act.saveCompensationPlanCompleted())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: compensation_plans should handle action: saveCompensationPlanCompleted in mode: duplicate', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))
    store.dispatch(act.beginCompensationPlanDuplicate())
    store.dispatch(act.saveCompensationPlanCompleted(99))

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: compensation_plans should handle action: saveCompensationPlanCompleted in mode: new', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.beginCompensationPlanCreate())
    store.dispatch(act.saveCompensationPlanCompleted(99))

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: compensation_plans should handle action: deleteCompensationPlanCompleted in mode: delete', () => {

    const store = createStore(root_reducer)

    const numCompensationPlans = store
        .getState()['compensation_plans']
        .get('list')
        .count()

    store.dispatch(act.deleteCompensationPlanCompleted())

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numCompensationPlans - 1)

})

it('reducer: compensation_plans should handle action: loadCompensationPlanListCompleted', () => {

    const store = createStore(root_reducer)

    store.dispatch(act.selectCompensationPlan(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginCompensationPlanDelete())
    store.dispatch(act.loadCompensationPlanListCompleted(newList))

    const newState = store.getState()['compensation_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: compensation_plans should handle action: loadCompensationPlanReferenceCompleted', () => {

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
    
    store.dispatch(act.loadCompensationPlanReferenceCompleted(newData))

    const newState = store.getState()['compensation_plans']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})