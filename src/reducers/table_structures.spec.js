import { createStore } from 'redux'
import root_reducer from './root_reducer'
import table_list from './table_list'

it('reducer table reducers have the required fields in their initial state', () => {
  table_list.forEach(table => {
    const store = createStore(root_reducer)
    const state = store.getState()[table]
    expect(state.get('selected_id')).toBeDefined()
    expect(state.get('list')).toBeDefined()
    expect(state.get('first_index')).toBeDefined()
    expect(state.get('list_dirty')).toBeDefined()
    expect(state.get('page_title')).toBeDefined()
    expect(state.get('selected_id')).toBeDefined()
    expect(state.get('current_sort')).toBeDefined()
    expect(state.getIn(['current_sort', 'field_name'])).toBeDefined()
    expect(state.getIn(['current_sort', 'direction'])).toBeDefined()
    expect(state.get('current_filters')).toBeDefined()
    expect(state.get('mode')).toBeDefined()
    expect(state.get('fields')).toBeDefined()
    expect(state.get('list_template')).toBeDefined()
    expect(state.getIn(['list_template','fields'])).toBeDefined()
    expect(state.get('details_template')).toBeDefined()
    expect(state.getIn(['details_template','current_tab'])).toBeDefined()
    expect(state.getIn(['details_template','tabs'])).toBeDefined()
    expect(state.get('context_menu')).toBeDefined()
    expect(state.get('ref_list')).toBeDefined()
    expect(state.get('referenced_tables')).toBeDefined()
    expect(state.get('ref_list_dirty')).toBeDefined()
    expect(state.get('typeahead')).toBeDefined()
  })
})
