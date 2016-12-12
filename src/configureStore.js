import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {

    //   const sagaMiddleware = createSagaMiddleware();

    //   const middlewareList = global.running_tests
    //     ? applyMiddleware(sagaMiddleware)
    //     : applyMiddleware(sagaMiddleware, createLogger());

    //   const store = createStore(
    //     rootReducer,
    //     compose(
    //       middlewareList,
    //       window.devToolsExtension ? window.devToolsExtension() : f => f
    //     )
    //   );

    //   if (module.hot) {
    //     // Enable Webpack hot module replacement for reducer
    //     module.hot.accept('./reducer', () => {
    //       const nextRootReducer = require('./reducer').default;
    //       store.replaceReducer(nextRootReducer);
    //     });
    //   }

    //   store.runSaga = sagaMiddleware.run;
    //   store.close = () => store.dispatch(END);
    //   return store;

    return createStore(rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

};

export default configureStore;