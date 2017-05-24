import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import auth from './auth';
import pageChange from './page-change';
import customers from './customers';

const root_reducer = combineReducers( {auth, pageChange, customers} );
const test_configureStore = () => {

    //   const sagaMiddleware = createSagaMiddleware();

    //   const middlewareList = global.running_tests
    //     ? applyMiddleware(sagaMiddleware)
    //     : applyMiddleware(sagaMiddleware, createLogger());

    //   const store = createStore(
    //     root_reducer,
    //     compose(
    //       middlewareList,
    //       window.devToolsExtension ? window.devToolsExtension() : f => f
    //     )
    //   );

    //   if (module.hot) {
    //     // Enable Webpack hot module replacement for reducer
    //     module.hot.accept('./reducer', () => {
    //       const nextroot_reducer = require('./reducer').default;
    //       store.replaceReducer(nextroot_reducer);
    //     });
    //   }

    //   store.runSaga = sagaMiddleware.run;
    //   store.close = () => store.dispatch(END);
    //   return store;

    return createStore(root_reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

};

export default test_configureStore;