import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./selectors.js";
import act from "./actions/";

import Login from "./components/Login";
import AdTypes from "./components/AdTypes";
import Categories from "./components/Categories";
import CompensationPlans from "./components/CompensationPlans";
import Customers from "./components/Customers";
import Fields from "./components/Fields";
import FindingLines from "./components/FindingLines";
import Headings from "./components/Headings";
import LocalForeigns from "./components/LocalForeigns";
import OrderLines from "./components/OrderLines";
import OrderStatuses from "./components/OrderStatuses";
import Orders from "./components/Orders";
import PageTypes from "./components/PageTypes";
import PayPlans from "./components/PayPlans";
import Permissions from "./components/Permissions";
import PrimaryBooks from "./components/PrimaryBooks";
import SalesReps from "./components/SalesReps";
import SourceBooks from "./components/SourceBooks";
import Udacs from "./components/Udacs";

const StyledMain = styled.div`
    flex: 1;
    background-color: white;
    border-left: 1px solid cadetblue;
    padding: 1rem;
`;

const Main = props => {
  const store = props.store;
  const state = store.getState();
  const loggedIn = isLoggedIn(state);

  const loadPageDataOrRedirect = Component => {
    if (!loggedIn) {
      return <Redirect to="/login" />;
    } else {
      return Component;
    }
  };

  return (
    <StyledMain>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          path="/ad_types"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <AdTypes
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/categories"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Categories
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/compensation_plans"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <CompensationPlans
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/customers"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Customers
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/fields"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Fields
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/findinglines"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <FindingLines
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/headings"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Headings
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/localforeign"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <LocalForeigns
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/order_lines"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <OrderLines
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/order_statuses"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <OrderStatuses
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/orders"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Orders
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/page_types"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <PageTypes
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/payplans"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <PayPlans
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/permissions"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Permissions
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/primary_books"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <PrimaryBooks
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/sales_reps"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <SalesReps
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/source_books"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <SourceBooks
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />
        <Route
          path="/udacs"
          render={({ location }) =>
            loadPageDataOrRedirect(
              <Udacs
                dispatch={store.dispatch}
                action={act.pageChange(location.pathname)}
              />
            )}
        />

      </Switch>
    </StyledMain>
  );
};
export default Main;
