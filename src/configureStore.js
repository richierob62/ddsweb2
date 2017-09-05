import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import root_reducer from './reducers/root_reducer'

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware()

	const middlewareList = applyMiddleware(sagaMiddleware)

	const allMiddleWare = [ middlewareList ]
	if (window.__REDUX_DEVTOOLS_EXTENSION__) allMiddleWare.push(window.__REDUX_DEVTOOLS_EXTENSION__())
	const store = createStore(root_reducer, compose(...allMiddleWare))

	store.runSaga = sagaMiddleware.run
	store.close = () => store.dispatch(END)
	return store
}

export default configureStore
