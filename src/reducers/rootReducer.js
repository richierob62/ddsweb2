import { combineReducers } from 'redux';
// import reducer_definitions from './reducer_definitions';
import auth from './auth';
import pageChange from './page-change';
import customers from './customers';

const rootReducer = combineReducers( {auth, pageChange, customers} );
export default rootReducer;