export const isLoggedIn = (state) => {
    return state['auth'].get('loggedIn');
}

export const getCustomerList = (state) => {
    return state['customers'].get('list');
}

export const getSelectedCustomerID = (state) => {
    return state['customers'].get('selected_id');
}

export const getCustomerSortField = (state) => {
    return state['customers'].get('sort_field');
}

export const getCustomerSortDirection = (state) => {
    return state['customers'].get('sort_direction');
}

export const getCustomerFilters = (state) => {
    return state['customers'].get('current_filters');
}



