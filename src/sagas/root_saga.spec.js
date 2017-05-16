import rootSaga from './root_saga'
import act from '../actions/'
import {createStore } from 'redux'
import {fork} from 'redux-saga/effects'


it('The root saga should react to action: pageChange', () => {
    const store = createStore(() => {})
    const generator = rootSaga();

    store.dispatch(act.pageChange('foo'))    

    // expect(generator.next().value).to.eql(fork(takeEvery, 'PRODUCTS_REQUESTED', fetchProducts));
    // expect(generator.next().done).to.eql(true);
})