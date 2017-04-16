/*eslint-disable no-unused-vars*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Login from './components/Login';
import AdTypes from './components/AdTypes'
import Categories from './components/Categories'
import CompensationPlans from './components/CompensationPlans'
import Customers from './components/Customers'
import Fields from './components/Fields'
import FindingLines from './components/FindingLines'
import Headings from './components/Headings'
import LocalForeigns from './components/LocalForeigns'
import OrderLines from './components/OrderLines'
import OrderStatuses from './components/OrderStatuses'
import Orders from './components/Orders'
import PageTypes from './components/PageTypes'
import PayPlans from './components/PayPlans'
import Permissions from './components/Permissions'
import PrimaryBooks from './components/PrimaryBooks'
import SalesReps from './components/SalesReps'
import SourceBooks from './components/SourceBooks'
import Udacs from './components/Udacs'


import { pageChange } from './actions';
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
    store.dispatch(pageChange(nextState.location.pathname));

  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="ad_types" onEnter={requireAuth} component={AdTypes} />
      <Route path="categories" onEnter={requireAuth} component={Categories} />
      <Route path="compensation_plans" onEnter={requireAuth} component={CompensationPlans} />
      <Route path="customers" onEnter={requireAuth} component={Customers} />
      <Route path="fields" onEnter={requireAuth} component={Fields} />
      <Route path="findinglines" onEnter={requireAuth} component={FindingLines} />
      <Route path="headings" onEnter={requireAuth} component={Headings} />
      <Route path="localforeign" onEnter={requireAuth} component={LocalForeigns} />
      <Route path="order_lines" onEnter={requireAuth} component={OrderLines} />
      <Route path="order_statuses" onEnter={requireAuth} component={OrderStatuses} />
      <Route path="orders" onEnter={requireAuth} component={Orders} />
      <Route path="page_types" onEnter={requireAuth} component={PageTypes} />
      <Route path="payplans" onEnter={requireAuth} component={PayPlans} />
      <Route path="permissions" onEnter={requireAuth} component={Permissions} />
      <Route path="primary_books" onEnter={requireAuth} component={PrimaryBooks} />
      <Route path="sales_reps" onEnter={requireAuth} component={SalesReps} />
      <Route path="source_books" onEnter={requireAuth} component={SourceBooks} />
      <Route path="udacs" onEnter={requireAuth} component={Udacs} />
    </Route>
  );

};