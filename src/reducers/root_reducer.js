import { combineReducers } from 'redux'
import generateTableReducer from './generate_table_reducer'

// reducers for table types
import ad_types from './ad_types'
import categories from './categories'
import compensation_plans from './compensation_plans'
import customers from './customers'
import fields from './fields'
import finding_lines from './finding_lines'
import headings from './headings'
import local_foreigns from './local_foreigns'
import order_lines from './order_lines'
import order_statuses from './order_statuses'
import orders from './orders'
import page_types from './page_types'
import pay_plans from './pay_plans'
import primary_books from './primary_books'
import sales_reps from './sales_reps'
import source_books from './source_books'
import udacs from './udacs'

// other reducers
import auth from './auth'
import modal from './modal'
import pageChange from './page_change'

const root_reducer = combineReducers({
	auth,
	modal,
	pageChange,
	ad_types: generateTableReducer('ad_types', ad_types),
	categories: generateTableReducer('categories', categories),
	compensation_plans: generateTableReducer('compensation_plans', compensation_plans),
	customers: generateTableReducer('customers', customers),
	fields: generateTableReducer('fields', fields),
	finding_lines: generateTableReducer('finding_lines', finding_lines),
	headings: generateTableReducer('headings', headings),
	local_foreigns: generateTableReducer('local_foreigns', local_foreigns),
	order_lines: generateTableReducer('order_lines', order_lines),
	orders: generateTableReducer('orders', orders),
	order_statuses: generateTableReducer('order_statuses', order_statuses),
	page_types: generateTableReducer('page_types', page_types),
	pay_plans: generateTableReducer('pay_plans', pay_plans),
	primary_books: generateTableReducer('primary_books', primary_books),
	sales_reps: generateTableReducer('sales_reps', sales_reps),
	source_books: generateTableReducer('source_books', source_books),
	udacs: generateTableReducer('udacs', udacs)
})

export default root_reducer
