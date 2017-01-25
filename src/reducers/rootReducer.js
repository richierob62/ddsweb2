import { combineReducers } from 'redux';

import auth from './auth';
import pageChange from './page-change';
import customers from './customers';
import sales_reps from './sales_reps';

const rootReducer = combineReducers({
    auth,
    pageChange,
    customers,
    sales_reps
});

export default rootReducer;