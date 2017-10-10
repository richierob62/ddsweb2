export const isLoggedInFn = state => () => state.auth.get('loggedIn')

export const getDisplayValueFromID = list => {
  return id => {
    const matching = list.find(item => item.get('id') === id)
    return matching ? matching.get('display') : ''
  }
}

export const getFilteredRefList = state => {
  const filter = state.get('typeahead')

  const filtered_list = state
    .get('ref_list')
    .toJS()
    .filter(item => {
      return item.display.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    })

  return filtered_list.length > 0 ? filtered_list : state.get('ref_list').toJS()
}

export const getPageTitle = state => state.get('page_title')

export const getListTemplateFields = state => state.getIn(['list_template','fields'])
export const getListWidth = state => state.getIn(['list_template','width'])

export const getCurrentSort = state => state.get('current_sort')

export const getCurrentFilters = state => state.get('current_filters')

export const getFilteredList = state => {
  const num_to_skip = state.get('first_index')
  return state
    .get('list')
    .skip(num_to_skip)
    .take(5)
}

export const getSelectedID = state => state.get('selected_id')

export const refMatcher = state => id =>
  state.get('ref_list').find(entry => entry.get('id') === id)

export const getCurrentRecord = state => {
  const id = state.get('selected_id')
  if (id === -1) return null
  return state.get('list').find(item => item.get('id') === id)
}

export const getTabNames = state =>
  state.getIn(['details_template', 'tabs']).map(tab => tab.get('name'))

export const getCurrentTab = state =>
  state.getIn(['details_template', 'current_tab'])


export const getDetailsLabelField = state =>
  state.getIn(['details_template', 'label_field'])

export const getCurrentTabRows = state => {
  const current_tab = getCurrentTab(state)
  return state
    .getIn(['details_template', 'tabs'])
    .find(tab => tab.get('name') === current_tab)
    .get('rows')
}

export const getFirstIndexInList = state => state.get('first_index')

export const getListSize = state => state.get('list').count()

export const getMode = state => state.get('mode')

export const getFieldDefinitions = state => state.get('fields')

export const getRefList = state => state.get('ref_list')

export const getModalType = state => state['modal'].get('type')

export const getModalMessageList = state => state['modal'].get('message_list')

export const getModalTitle = state => state['modal'].get('title')

export const getModalText = state => state['modal'].get('text')

export const loginErrorMessage = state => state['auth'].get('message')
