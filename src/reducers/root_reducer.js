import { combineReducers } from 'redux'
import generateTableReducer from './generate_table_reducer'

// redicers for table types
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
	ad_types: generateTableReducer('ad_type', ad_types),
	categories: generateTableReducer('category', categories),
	compensation_plans: generateTableReducer('compensation_plan', compensation_plans),
	customers: generateTableReducer('customer', customers),
	fields: generateTableReducer('field', fields),
	finding_lines: generateTableReducer('finding_line', finding_lines),
	headings: generateTableReducer('heading', headings),
	local_foreigns: generateTableReducer('local_foreign', local_foreigns),
	order_lines: generateTableReducer('order_line', order_lines),
	orders: generateTableReducer('order', orders),
	order_statuses: generateTableReducer('order_status', order_statuses),
	page_types: generateTableReducer('page_type', page_types),
	pay_plans: generateTableReducer('pay_plan', pay_plans),
	primary_books: generateTableReducer('primary_book', primary_books),
	sales_reps: generateTableReducer('sales_rep', sales_reps),
	source_books: generateTableReducer('source_book', source_books),
	udacs: generateTableReducer('udac', udacs)
})

export default root_reducer
