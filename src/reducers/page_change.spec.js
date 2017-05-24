import {createStore } from 'redux'
import act from '../actions/'
import root_reducer from './root_reducer'


it('reducer: page-change should handle action: pageChange', () => {
    const store = createStore(root_reducer)
    store.dispatch(act.pageChange('foo'));
    const newState = store.getState()['pageChange']
    expect(newState.get('current_path')).toEqual('foo')
})