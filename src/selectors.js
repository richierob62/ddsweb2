export const isLoggedIn = (state) => state.auth.get('loggedIn')

export const getDisplayValueFromID = (list) => {
    return (id) => {
        const match = list.find((item) => item.get('id') === id).get('display')
        return match ? match : ''
    }
}

export const getCurrent = (state) => {
    const id = state.get('selected_id')
    if (id === -1) return null;
    return state.get('list').find( cust => cust.get('id') === id) 
};


export const getFilteredRefList = (state) => {
    const filter = state.get('typeahead')

    const filtered_list = state.get('ref_list').toJS().filter( item => {
        return item.display.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    })

    return filtered_list.length > 0 ? filtered_list : state.get('ref_list').toJS()    
}

// export const getCustomerList = (state) => {
//     return state['customers'].get('list')
// }

// export const getSelectedCustomerID = (state) => {
//     return state['customers'].get('selected_id')
// }

// export const getCustomerSortField = (state) => {
//     return state['customers'].get('sort_field')
// }

// export const getCustomerSortDirection = (state) => {
//     return state['customers'].get('sort_direction')
// }

// export const getCustomerFilters = (state) => {
//     return state['customers'].get('current_filters')
// }

// export const getCustomerDetails = (state) => {
//     const id = state['customers'].get('selected_id')
//     return state['customers'].get('list').find(
//         item => item.get('id') === id,
//         this,
//         null
//     )
// }

// export const getCustomerIsSelected = (state) => {
//     return getCustomerDetails(state) === null ? false : true
// }


// export const getCustomerMode = (state) => {
//     return state['customers'].get('mode')
// }

