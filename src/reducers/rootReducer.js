import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import generateTableReducer from './generate_table_reducer'

import auth from './auth';
import ad_types from './ad_types';
import categories from './categories';
import compensation_plans from './compensation_plans';
import customers from './customers';
import fields from './fields';
import finding_lines from './finding_lines';
import headings from './headings';
import local_foreigns from './local_foreigns';
import order_lines from './order_lines';
import orders from './orders';
import order_statuses from './order_statuses';
import pageChange from './page_change';
import pay_plans from './pay_plans';
import primary_books from './primary_books';
import sales_reps from './sales_reps';
import source_books from './source_books';
import udacs from './udacs';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    pageChange,
    ad_types : generateTableReducer('ad_type', ad_types),
    categories : generateTableReducer('category', categories),
    compensation_plans : generateTableReducer('compensation_plan', compensation_plans),
    customers : generateTableReducer('customer', customers),
    fields : generateTableReducer('field', fields),
    finding_lines : generateTableReducer('finding_line', finding_lines),
    headings : generateTableReducer('heading', headings),
    local_foreigns : generateTableReducer('local_foreign', local_foreigns),
    order_lines : generateTableReducer('order_line', order_lines),
    orders : generateTableReducer('order', orders),
    order_statuses : generateTableReducer('order_status', order_statuses),
    pay_plans : generateTableReducer('pay_plan', pay_plans),
    primary_books : generateTableReducer('primary_book', primary_books),
    sales_reps : generateTableReducer('sales_rep', sales_reps),
    source_books : generateTableReducer('source_book', source_books),
    udacs : generateTableReducer('udac', udacs),
});

export default rootReducer;