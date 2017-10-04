import React from 'react'
import { Route } from 'react-router-dom'
import { TransitionMotion, spring } from 'react-motion'
import act from '../actions/'

const AnimatedRoute = ({
  component,
  loggedInFn,
  dispatch,
  path,
  history,
  ...rest
}) => {
  dispatch(act['checkSleep']())

  if (!loggedInFn()) {
    dispatch(act['beginLogin']({ path, history }))
    return null
  }

  return (
    <Route
      {...rest}
      children={({ location, match }) => (
        <TransitionMotion
          willEnter={() => {
            return { rotation: 180 }
          }}
          willLeave={() => {
            return { rotation: 0 }
          }}
          defaultStyles={[
            {
              key: location.pathname,
              style: { rotation: 180 }
            }
          ]}
          styles={
            match ? (
              [
                {
                  key: location.pathname,
                  style: {
                    rotation: spring(0, { stiffness: 200, damping: 25 })
                  }
                }
              ]
            ) : (
              []
            )
          }
        >
          {interpolatedStyles => (
            <div
              className="route"
              style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {interpolatedStyles.map(config => (
                <div
                  key={config.key}
                  style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    transform: `rotateX(${config.style.rotation}deg)`
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
  )
}

export default AnimatedRoute
