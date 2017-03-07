import { combineReducers } from 'redux';

import auth from './auth';
import pageChange from './page-change';
import customers from './customers';
import sales_reps from './sales_reps';
import categories from './categories';
import local_foreigns from './local_foreigns';
import pay_plans from './pay_plans';
import primary_books from './primary_books';

const rootReducer = combineReducers({
    auth,
    pageChange,
    customers,
    sales_reps,
    categories,
    local_foreigns,
    pay_plans,
    primary_books
});

export default rootReducer;