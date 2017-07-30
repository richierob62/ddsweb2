import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./selectors.js";
import act from "./actions/";
import asyncComponent from "./utils/async_loader";
import { CSSTransitionGroup } from "react-transition-group";

const Login = asyncComponent(() => import("./components/Login"));
const AdTypes = asyncComponent(() => import("./components/AdTypes"));
const Categories = asyncComponent(() => import("./components/Categories"));
const CompensationPlans = asyncComponent(() =>
  import("./components/CompensationPlans")
);
const Customers = asyncComponent(() => import("./components/Customers"));
const Fields = asyncComponent(() => import("./components/Fields"));
const FindingLines = asyncComponent(() => import("./components/FindingLines"));
const Headings = asyncComponent(() => import("./components/Headings"));
const LocalForeigns = asyncComponent(() =>
  import("./components/LocalForeigns")
);
const OrderLines = asyncComponent(() => import("./components/OrderLines"));
const OrderStatuses = asyncComponent(() =>
  import("./components/OrderStatuses")
);
const Orders = asyncComponent(() => import("./components/Orders"));
const PageTypes = asyncComponent(() => import("./components/PageTypes"));
const PayPlans = asyncComponent(() => import("./components/PayPlans"));
const Permissions = asyncComponent(() => import("./components/Permissions"));
const PrimaryBooks = asyncComponent(() => import("./components/PrimaryBooks"));
const SalesReps = asyncComponent(() => import("./components/SalesReps"));
const SourceBooks = asyncComponent(() => import("./components/SourceBooks"));
const Udacs = asyncComponent(() => import("./components/Udacs"));

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
      <Route
        render={({ location }) => {
          return (
            <CSSTransitionGroup
              transitionName="page"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              <Switch location={location} key={location.key}>
                <Route path="/login" component={Login} />

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
            </CSSTransitionGroup>
          );
        }}
      />
    </StyledMain>
  );
};
export default Main;
