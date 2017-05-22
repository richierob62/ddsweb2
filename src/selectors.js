export const isLoggedIn = (state) => state.auth.get('loggedIn')

export const getDisplayValueFromID = (list) => {
    return (id) => {
        const matching = list.find((item) => item.get('id') === id)
        return matching ? matching.get('display') : ''
    }
}



export const getFilteredRefList = (state) => {
    const filter = state.get('typeahead')

    const filtered_list = state.get('ref_list').toJS().filter(item => {
        return item.display.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    })

    return filtered_list.length > 0 ? filtered_list : state.get('ref_list').toJS()
}

export const getPageTitle = state => state.get('page_title')

export const getFields = state => state.get('fields')

export const getListTemplate = state => state.get('list_template')

export const getCurrentSort = state => state.get('current_sort')

export const getActionWord = state => state.get('action_word')

export const getCurrentFilters = state => state.get('current_filters')

export const getFilteredList = state => {
    const num_to_skip = state.get('first_index')
    return state
        .get('list')
        .skip(num_to_skip)
        .take(5)
}

export const getSelectedID = state => state.get('selected_id')

export const refSelector = state => id => state.get('ref_list').find(entry => entry.get('id') === id)

export const getCurrentRecord = (state) => {
    const id = state.get('selected_id')
    if (id === -1) return null;
    return state.get('list').find(item => item.get('id') === id)
};

export const getTabNames = state => state.getIn(['details_template', 'tabs']).map(tab => tab.get('name'))

export const getCurrentTab = state => state.getIn(['details_template', 'current_tab'])

export const getFirstIndexInList = state => state.get('first_index')

export const getListSize = state => state.get('list').count()