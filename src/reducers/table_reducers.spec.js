import { createStore } from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'
import proper_camel from '../utils/proper_camel'

const tables = [
	[ 'ad_type', 'ad_types' ],
	[ 'category', 'categories' ],
	[ 'compensation_plan', 'compensation_plans' ],
	[ 'customer', 'customers' ],
	[ 'field', 'fields' ],
	[ 'finding_line', 'finding_lines' ],
	[ 'heading', 'headings' ],
	[ 'local_foreign', 'local_foreigns' ],
	[ 'order_line', 'order_lines' ],
	[ 'order_status', 'order_statuses' ],
	[ 'order', 'orders' ],
	[ 'page_type', 'page_types' ],
	[ 'pay_plan', 'pay_plans' ],
	[ 'primary_book', 'primary_books' ],
	[ 'sales_rep', 'sales_reps' ],
	[ 'source_book', 'source_books' ],
	[ 'udac', 'udacs' ]
]

it('should return the initial state', () => {
	expect(root_reducer(undefined, {})).toBeDefined()
})

it('reducer: table reducers handle select item actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		const selectActionName = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName](2))
		const newState = store.getState()[table[1]]
		expect(newState.get('selected_id')).toEqual(2)
	})
})

it('reducer: table reducers handle select tab actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		const selectActionName = 'select' + proper_camel(table[0]) + 'Tab'
		store.dispatch(act[selectActionName]('foo'))
		const newState = store.getState()[table[1]]
		expect(newState.getIn([ 'details_template', 'current_tab' ])).toEqual('foo')
	})
})

it('reducer: table reducers handle change data actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const newData = {
			field: 'value',
			value: 'bar'
		}

		const selectActionName3 = 'change' + proper_camel(table[0]) + 'Data'

		store.dispatch(act[selectActionName3](newData))
		const list = store.getState()[table[1]].get('list').toJS()
		expect(list).toEqual([ { id: 1, value: 'foo_1' }, { id: 2, value: 'bar' } ])
	})
})

it('reducer: table reducers handle change filter actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		const newFilter = {
			column: 'foo',
			value: 'bar'
		}
		const selectActionName3 = 'change' + proper_camel(table[0]) + 'Filter'

		store.dispatch(act[selectActionName3](newFilter))
		const filters = store.getState()[table[1]].get('current_filters').toJS()
		expect(filters).toEqual({
			foo: 'bar'
		})
	})
})

it('reducer: table reducers handle change sort actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		const payload = {
			reducer: table[1],
			list: newList,
			field_name: 'foo',
			direction: 'DESC'
		}
		store.dispatch(act['sortChangeCompleted'](payload))
		const sort = store.getState()[table[1]].get('current_sort').toJS()
		expect(sort).toEqual({
			direction: 'DESC',
			field_name: 'foo'
		})
	})
})

it('reducer: table reducers handle begin edit actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Edit'

		store.dispatch(act[selectActionName3]())
		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('edit')
		expect(newState.get('backup_copy')).toBeDefined()
	})
})

it('reducer: table reducers handle begin create actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Create'

		store.dispatch(act[selectActionName3]())
		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('new')
		expect(newState.get('selected_id')).not.toEqual(2)
		expect(newState.get('list').count()).toEqual(3)
	})
})

it('reducer: table reducers handle begin delete actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Delete'

		store.dispatch(act[selectActionName3]())
		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('delete')
	})
})

it('reducer: table reducers handle begin duplicate actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])

		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Duplicate'

		store.dispatch(act[selectActionName3]())
		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('duplicate')
		expect(newState.get('selected_id')).not.toEqual(2)
		expect(newState.get('list').count()).toEqual(3)
	})
})

it('reducer: table reducers handle cancel actions after begin edit actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Edit'

		store.dispatch(act[selectActionName3]())

		const newData = {
			field: 'value',
			value: 'bar'
		}

		const selectActionName4 = 'change' + proper_camel(table[0]) + 'Data'

		store.dispatch(act[selectActionName4](newData))

		const selectActionName5 = 'cancel' + proper_camel(table[0])

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(2)
		expect(newState.get('backup_copy')).toEqual(undefined)
		expect(newState.get('list').find((item) => item.get('id') === 2).get('value')).toEqual('foo_2')
	})
})

it('reducer: table reducers handle cancel actions after begin create actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Create'

		store.dispatch(act[selectActionName3]())

		const newData = {
			field: 'value',
			value: 'bar'
		}

		const selectActionName4 = 'change' + proper_camel(table[0]) + 'Data'

		store.dispatch(act[selectActionName4](newData))

		const selectActionName5 = 'cancel' + proper_camel(table[0])

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(-1)
		expect(newState.get('backup_copy')).toEqual(undefined)
	})
})

it('reducer: table reducers handle cancel actions after begin delete actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Delete'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'cancel' + proper_camel(table[0])

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(2)
	})
})

it('reducer: table reducers handle cancel actions after begin duplicate actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Duplicate'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'cancel' + proper_camel(table[0])

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(-1)
	})
})

it('reducer: table reducers handle saveCompleted actions after edit', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Edit'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'save' + proper_camel(table[0]) + 'Completed'

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(2)
		expect(newState.get('backup_copy')).toEqual(undefined)
	})
})

it('reducer: table reducers handle saveCompleted actions after duplicate', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Duplicate'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'save' + proper_camel(table[0]) + 'Completed'

		store.dispatch(act[selectActionName5]({ id: 3, value: 'bar' }))

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(3)
		expect(newState.get('backup_copy')).toEqual(undefined)
	})
})

it('reducer: table reducers handle saveCompleted actions after new', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Create'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'save' + proper_camel(table[0]) + 'Completed'

		store.dispatch(act[selectActionName5]({ id: 3, value: 'bar' }))

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(3)
		expect(newState.get('backup_copy')).toEqual(undefined)
	})
})

it('reducer: table reducers handle deleteCompleted actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)

		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		// select item 2
		const selectActionName2 = 'select' + proper_camel(table[0])
		store.dispatch(act[selectActionName2](2))

		const selectActionName3 = 'begin' + proper_camel(table[0]) + 'Delete'

		store.dispatch(act[selectActionName3]())

		const selectActionName5 = 'delete' + proper_camel(table[0]) + 'Completed'

		store.dispatch(act[selectActionName5]())

		const newState = store.getState()[table[1]]
		expect(newState.get('mode')).toEqual('display')
		expect(newState.get('selected_id')).toEqual(-1)
	})
})

it('reducer: table reducers handle loadListCompleted actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ListCompleted'
		const newList = [ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		const list = store.getState()[table[1]].get('list').toJS()
		expect(list).toEqual([ { id: 1, value: 'foo_1' }, { id: 2, value: 'foo_2' } ])
	})
})

it('reducer: table reducers handle loadReferenceCompleted actions', () => {
	tables.forEach((table) => {
		const store = createStore(root_reducer)
		// add data to list for test
		const selectActionName = 'load' + proper_camel(table[0]) + 'ReferenceCompleted'
		const newList = [ { id: 1, display: 'foo_1' }, { id: 2, display: 'foo_2' } ]
		store.dispatch(act[selectActionName](newList))

		const ref_list = store.getState()[table[1]].get('ref_list').toJS()
		expect(ref_list).toEqual([ { id: 1, display: 'foo_1' }, { id: 2, display: 'foo_2' } ])
	})
})
