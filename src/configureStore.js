import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import root_reducer from './reducers/root_reducer';

const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware();

    const middlewareList = global.running_tests
        ? applyMiddleware(sagaMiddleware)
        : applyMiddleware(sagaMiddleware);

    const store = createStore(root_reducer,
        compose(
            middlewareList,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;

};

export default configureStore;