/*eslint-disable no-unused-vars*/
import React from 'react';
import App from './App';
import Login from './components/Login';
import Customers from './components/Customers';
import { pageChange } from './actions';
import { Route, IndexRoute } from 'react-router';
import { isLoggedIn } from './selectors.js';
/*eslint-enable no-unused-vars*/


export const getRoutes = (store) => {

  const requireAuth = (nextState, replace) => {
    const state = store.getState();

    if (!isLoggedIn(state)) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
    }
    
    // fire page change action
    store.dispatch( pageChange(nextState.location.pathname));

  };

  return (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="customers" onEnter={requireAuth} component={Customers}/>
    </Route>
  );

};