import React from "react";
import { Route, Redirect } from "react-router-dom";
import { TransitionMotion, spring } from "react-motion";
import presets from "react-motion/lib/presets";
import asyncComponent from "../utils/async_loader";

const Login = asyncComponent(() => import("./Login"));
const AdTypes = asyncComponent(() => import("./AdTypes"));
const Categories = asyncComponent(() => import("./Categories"));
const CompensationPlans = asyncComponent(() => import("./CompensationPlans"));
const Customers = asyncComponent(() => import("./Customers"));
const Fields = asyncComponent(() => import("./Fields"));
const FindingLines = asyncComponent(() => import("./FindingLines"));
const Headings = asyncComponent(() => import("./Headings"));
const LocalForeigns = asyncComponent(() => import("./LocalForeigns"));
const OrderLines = asyncComponent(() => import("./OrderLines"));
const OrderStatuses = asyncComponent(() => import("./OrderStatuses"));
const Orders = asyncComponent(() => import("./Orders"));
const PageTypes = asyncComponent(() => import("./PageTypes"));
const PayPlans = asyncComponent(() => import("./PayPlans"));
const Permissions = asyncComponent(() => import("./Permissions"));
const PrimaryBooks = asyncComponent(() => import("./PrimaryBooks"));
const SalesReps = asyncComponent(() => import("./SalesReps"));
const SourceBooks = asyncComponent(() => import("./SourceBooks"));
const Udacs = asyncComponent(() => import("./Udacs"));

const AnimatedRoute = ({ component, loggedIn, dispatch, action, ...rest }) => {
  if (!loggedIn) return <Redirect to="/login" />;

  let comp_to_render;

  switch (component) {
    case "Login":
      comp_to_render = <Login dispatch={dispatch} action={action} />;
      break;

    case "AdTypes":
      comp_to_render = <AdTypes dispatch={dispatch} action={action} />;
      break;

    case "Categories":
      comp_to_render = <Categories dispatch={dispatch} action={action} />;
      break;

    case "CompensationPlans":
      comp_to_render = (
        <CompensationPlans dispatch={dispatch} action={action} />
      );
      break;

    case "Customers":
      comp_to_render = <Customers dispatch={dispatch} action={action} />;
      break;

    case "Fields":
      comp_to_render = <Fields dispatch={dispatch} action={action} />;
      break;

    case "FindingLines":
      comp_to_render = <FindingLines dispatch={dispatch} action={action} />;
      break;

    case "Headings":
      comp_to_render = <Headings dispatch={dispatch} action={action} />;
      break;

    case "LocalForeigns":
      comp_to_render = <LocalForeigns dispatch={dispatch} action={action} />;
      break;

    case "OrderLines":
      comp_to_render = <OrderLines dispatch={dispatch} action={action} />;
      break;

    case "OrderStatuses":
      comp_to_render = <OrderStatuses dispatch={dispatch} action={action} />;
      break;

    case "Orders":
      comp_to_render = <Orders dispatch={dispatch} action={action} />;
      break;

    case "PageTypes":
      comp_to_render = <PageTypes dispatch={dispatch} action={action} />;
      break;

    case "PayPlans":
      comp_to_render = <PayPlans dispatch={dispatch} action={action} />;
      break;

    case "Permissions":
      comp_to_render = <Permissions dispatch={dispatch} action={action} />;
      break;

    case "PrimaryBooks":
      comp_to_render = <PrimaryBooks dispatch={dispatch} action={action} />;
      break;

    case "SalesReps":
      comp_to_render = <SalesReps dispatch={dispatch} action={action} />;
      break;

    case "SourceBooks":
      comp_to_render = <SourceBooks dispatch={dispatch} action={action} />;
      break;

    case "Udacs":
      comp_to_render = <Udacs dispatch={dispatch} action={action} />;
      break;

    default:
      comp_to_render = <Login dispatch={dispatch} action={action} />;
  }

  return (
    <Route
      {...rest}
      children={({ location, match }) => (
        <TransitionMotion
          willEnter={() => {
            return { opacity: 0, scale: 0 };
          }}
          willLeave={() => {
            return {
              opacity: spring(0, presets.gentle),
              scale: spring(1)
            };
          }}
          defaultStyles={[
            {
              key: location.pathname,
              style: { opacity: 0, scale: 0 },
              data: match
            }
          ]}
          styles={
            match
              ? [
                  {
                    key: location.pathname,
                    style: {
                      opacity: spring(1, presets.gentle),
                      scale: spring(1)
                    }
                  }
                ]
              : []
          }
        >
          {interpolatedStyles => (
            <div className="route">
              {interpolatedStyles.map(config => (
                <div
                  key={config.key}
                  style={{
                    position: "absolute",
                    opacity: `${config.style.opacity}`,
                    transform: `scale(${config.style.scale})`
                  }}
                >
                  {comp_to_render}
                </div>
              ))}
            </div>
          )}
        </TransitionMotion>
      )}
    />
  );
};

export default AnimatedRoute;
