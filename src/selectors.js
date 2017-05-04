export const isLoggedIn = (state) => state.auth.get('loggedIn')

export const getDisplayValueFromID = (list) => {
    return (id) => {
        const matching = list.find((item) => item.get('id') === id)
        return matching ? matching.get('display') : ''
    }
}

export const getCurrent = (state) => {
    const id = state.get('selected_id')
    if (id === -1) return null;
    return state.get('list').find( item => item.get('id') === id) 
};

export const getFilteredRefList = (state) => {
    const filter = state.get('typeahead')

    const filtered_list = state.get('ref_list').toJS().filter( item => {
        return item.display.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    })

    return filtered_list.length > 0 ? filtered_list : state.get('ref_list').toJS()    
}

