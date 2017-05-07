import {createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBeDefined()
})

it('reducer: pay_plans should handle action: selectPayPlan', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectPayPlan(2))
    const newState = store.getState()['pay_plans']
    expect(newState.get('selected_id')).toEqual(2)
})

it('reducer: pay_plans should handle action: selectPayPlanTab', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.selectPayPlanTab('foo'))
    const newState = store.getState()['pay_plans']
    expect(newState.getIn(['details_template', 'current_tab'])).toEqual('foo')
})

it('reducer: pay_plans should handle action: changePayPlanData', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePayPlanData(newData))

    const newState = store.getState()['pay_plans']
    const field = newState
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')
    expect(field).toEqual('foo')

})

it('reducer: pay_plans should handle action: changePayPlanFilter', () => {

    const store = createStore(rootReducer)

    const newData = {
        column: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePayPlanFilter(newData))

    const newState = store.getState()['pay_plans']
    const filter = newState
        .get('current_filters')
        .toJS()
    expect(filter).toEqual({"code": "foo"})

    const newData_2 = {
        column: 'hello',
        value: 'dolly'
    }

    const action_2 = act.changePayPlanFilter(newData_2)
    store.dispatch(action_2)

    const newState_2 = store.getState()['pay_plans']
    const filter_2 = newState_2
        .get('current_filters')
        .toJS()
    expect(filter_2).toEqual({"code": "foo", "hello": "dolly"})

})

it('reducer: pay_plans should handle action: changePayPlanSort', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.changePayPlanSort('foo'))

    const newState = store.getState()['pay_plans']
    const sort = newState
        .get('current_sort')
        .toJS()
    expect(sort).toEqual({field_name: 'foo', direction: 'ASC'})

})

it('reducer: pay_plans should handle action: beginPayPlanEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    store.dispatch(act.beginPayPlanEdit())

    const newState = store.getState()['pay_plans']
    expect(newState.get('mode')).toEqual('edit')
    expect(newState.get('backup_copy')).toBeDefined()

})

it('reducer: pay_plans should handle action: beginPayPlanCreate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.beginPayPlanCreate())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('new')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numPayPlans + 1)

})

it('reducer: pay_plans should handle action: beginPayPlanDelete', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    store.dispatch(act.beginPayPlanDelete())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('delete')
    expect(newState.get('selected_id')).toEqual(2)

})

it('reducer: pay_plans should handle action: beginPayPlanDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.beginPayPlanDuplicate())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('duplicate')
    expect(newState.get('selected_id'))
        .not
        .toEqual(2)
    expect(newState.get('list').count()).toEqual(numPayPlans + 1)

})

it('reducer: pay_plans should handle action: cancelPayPlan after beginPayPlanEdit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const original_val = store
        .getState()['pay_plans']
        .get('list')
        .find((item) => item.get('id') === 2)
        .get('code')

    store.dispatch(act.beginPayPlanEdit())

    const newData = {
        field: 'code',
        value: 'foo'
    }

    store.dispatch(act.changePayPlanData(newData))
    store.dispatch(act.cancelPayPlan())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)
    expect(newState.get('list').find((item) => item.get('id') === 2).get('code')).toEqual(original_val)

})

it('reducer: pay_plans should handle action: cancelPayPlan after beginPayPlanCreate', () => {

    const store = createStore(rootReducer)

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.beginPayPlanCreate())

    store.dispatch(act.cancelPayPlan())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPayPlans)

})

it('reducer: pay_plans should handle action: cancelPayPlan after beginPayPlanDelete', () => {

    const store = createStore(rootReducer)

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.selectPayPlan(2))
    store.dispatch(act.beginPayPlanDelete())
    store.dispatch(act.cancelPayPlan())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('list').count()).toEqual(numPayPlans)

})

it('reducer: pay_plans should handle action: cancelPayPlan after beginPayPlanDuplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.beginPayPlanDuplicate())
    store.dispatch(act.cancelPayPlan())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPayPlans)

})

it('reducer: pay_plans should handle action: savePayPlanCompleted in mode: edit', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))
    store.dispatch(act.beginPayPlanEdit())
    store.dispatch(act.savePayPlanCompleted())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(2)
    expect(newState.get('backup_copy')).toEqual(undefined)

})

it('reducer: pay_plans should handle action: savePayPlanCompleted in mode: duplicate', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))
    store.dispatch(act.beginPayPlanDuplicate())
    store.dispatch(act.savePayPlanCompleted(99))

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: pay_plans should handle action: savePayPlanCompleted in mode: new', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.beginPayPlanCreate())
    store.dispatch(act.savePayPlanCompleted(99))

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(99)

})

it('reducer: pay_plans should handle action: deletePayPlanCompleted in mode: delete', () => {

    const store = createStore(rootReducer)

    const numPayPlans = store
        .getState()['pay_plans']
        .get('list')
        .count()

    store.dispatch(act.deletePayPlanCompleted())

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(numPayPlans - 1)

})

it('reducer: pay_plans should handle action: loadPayPlanListCompleted', () => {

    const store = createStore(rootReducer)

    store.dispatch(act.selectPayPlan(2))

    const newList = [
        {
            id: 1,
            name: 'foo'
        }, {
            id: 2,
            name: 'bar'
        }
    ]

    store.dispatch(act.beginPayPlanDelete())
    store.dispatch(act.loadPayPlanListCompleted(newList))

    const newState = store.getState()['pay_plans']

    expect(newState.get('mode')).toEqual('display')
    expect(newState.get('selected_id')).toEqual(-1)
    expect(newState.get('list').count()).toEqual(2)

})

it('reducer: pay_plans should handle action: loadPayPlanReferenceCompleted', () => {

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
    
    store.dispatch(act.loadPayPlanReferenceCompleted(newData))

    const newState = store.getState()['pay_plans']

    expect(newState.get('ref_list').count()).toEqual(2)
    expect(newState.get('ref_list').toJS()).toEqual(newData)

})