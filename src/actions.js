export const pageChange = (payload) => {
    return { type: 'PAGE_CHANGE', payload }
}

export const selectCustomer = (payload) => {
    return { type: 'SELECT_CUSTOMER', payload }
}

export const changeCustomerSort = (payload) => {
    return { type: 'CHANGE_CUSTOMER_SORT', payload }
}

export const changeCustomerFilter = (payload) => {
    return { type: 'CHANGE_CUSTOMER_FILTER', payload }
}

export const updateCustomer = (payload) => {
    return { type: 'UPDATE_CUSTOMER', payload }
}

export const selectCustomerTab = (payload) => {
    return { type: 'SELECT_CUSTOMER_TAB', payload }
}

export const changeCustomer = (payload) => {
    return { type: 'CHANGE_CUSTOMER', payload }
}