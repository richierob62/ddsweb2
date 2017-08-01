import React from "react";
import { Route, Redirect } from "react-router-dom";
import { TransitionMotion, spring } from "react-motion";
import presets from "react-motion/lib/presets";

const AnimatedRoute = ({ component, loggedIn, ...rest }) => {
  if (!loggedIn) return <Redirect to="/login" />;

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
            <div className="route" style={{ position: "relative" }}>
              {interpolatedStyles.map(config => (
                <div
                  key={config.key}
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    opacity: `${config.style.opacity}`,
                    transform: `scale(${config.style.scale})`
                  }}
                >
                  {component}
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
