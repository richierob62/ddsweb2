import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { isLoggedIn } from "./selectors.js";
import act from "./actions/";
import AnimatedRoute from "./components/AnimatedRoute";
import asyncComponent from "./utils/async_loader";

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

  return (
    <StyledMain>
      <Route
        render={({ location, history }) => {

          const common_props = {
            dispatch: store.dispatch,
            action: act.pageChange(location.pathname)
          };

          return (
            <Switch>
            
              <AnimatedRoute
                path="/ad_types"
                component={<AdTypes {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/categories"
                component={<Categories {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/compensation_plans"
                component={<CompensationPlans {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/customers"
                component={<Customers {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/fields"
                component={<Fields {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/findinglines"
                component={<FindingLines {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/headings"
                component={<Headings {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/localforeign"
                component={<LocalForeigns {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/order_lines"
                component={<OrderLines {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/order_statuses"
                component={<Orders {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/orders"
                component={<OrderStatuses {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/page_types"
                component={<PageTypes {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/payplans"
                component={<PayPlans {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/permissions"
                component={<Permissions {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/primary_books"
                component={<PrimaryBooks {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/sales_reps"
                component={<SalesReps {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/source_books"
                component={<SourceBooks {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />
              <AnimatedRoute
                path="/udacs"
                component={<Udacs {...common_props} />}
                loggedIn={loggedIn}
                dispatch={store.dispatch}
                history={history}
              />

            </Switch>
          );
        }}
      />
    </StyledMain>
  );
};
export default Main;
