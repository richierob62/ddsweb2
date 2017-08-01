import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { isLoggedIn } from "./selectors.js";
import act from "./actions/";
import AnimatedRoute from "./components/AnimatedRoute";

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
        render={({ location }) => {


          const common_props = {
            dispatch: store.dispatch,
            action: act.pageChange(location.pathname),
            loggedIn
          };

          return (
            <Switch>

              <AnimatedRoute
                path="/login"
                component="Login"
                {...common_props}
              />

              <AnimatedRoute
                path="/ad_types"
                component="AdTypes"
                {...common_props}
              />

              <AnimatedRoute
                path="/categories"
                component="Categories"
                {...common_props}
              />

              <AnimatedRoute
                path="/compensation_plans"
                component="CompensationPlans"
                {...common_props}
              />
              <AnimatedRoute
                path="/customers"
                component="Customers"
                {...common_props}
              />
              <AnimatedRoute
                path="/fields"
                component="Fields"
                {...common_props}
              />
              <AnimatedRoute
                path="/findinglines"
                component="FindingLines"
                {...common_props}
              />
              <AnimatedRoute
                path="/headings"
                component="Headings"
                {...common_props}
              />
              <AnimatedRoute
                path="/localforeign"
                component="LocalForeigns"
                {...common_props}
              />
              <AnimatedRoute
                path="/order_lines"
                component="OrderLines"
                {...common_props}
              />
              <AnimatedRoute
                path="/order_statuses"
                component="OrderStatuses"
                {...common_props}
              />
              <AnimatedRoute
                path="/orders"
                component="Orders"
                {...common_props}
              />
              <AnimatedRoute
                path="/page_types"
                component="PageTypes"
                {...common_props}
              />
              <AnimatedRoute
                path="/payplans"
                component="PayPlans"
                {...common_props}
              />
              <AnimatedRoute
                path="/permissions"
                component="Permissions"
                {...common_props}
              />
              <AnimatedRoute
                path="/primary_books"
                component="PrimaryBooks"
                {...common_props}
              />
              <AnimatedRoute
                path="/sales_reps"
                component="SalesReps"
                {...common_props}
              />
              <AnimatedRoute
                path="/source_books"
                component="SourceBooks"
                {...common_props}
              />
              <AnimatedRoute
                path="/udacs"
                component="Udacs"
                {...common_props}
              />
            </Switch>
          );
        }}
      />
    </StyledMain>
  );
};
export default Main;
