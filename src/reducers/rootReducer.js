import { combineReducers } from 'redux';

import auth from './auth';
import ad_types from './ad_types';
import categories from './categories';
import compensation_plans from './compensation_plans';
import customers from './customers';
import fields from './fields';
import finding_lines from './finding_lines';
import headings from './headings';
import local_foreigns from './local_foreigns';
import pageChange from './page-change';
import pay_plans from './pay_plans';
import primary_books from './primary_books';
import sales_reps from './sales_reps';

const rootReducer = combineReducers({
    auth,
    ad_types,
    categories,
    compensation_plans,
    customers,
    fields,
    finding_lines,
    headings,
    local_foreigns,
    pageChange,
    pay_plans,
    primary_books,
    sales_reps,
});

export default rootReducer;