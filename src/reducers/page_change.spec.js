import {createStore } from 'redux'
import act from '../actions/'
import rootReducer from './rootReducer'


it('reducer: page-change should handle action: pageChange', () => {
    const store = createStore(rootReducer)
    store.dispatch(act.pageChange('foo'));
    const newState = store.getState()['pageChange']
    expect(newState.get('current_path')).toEqual('foo')
})