export const pageChange = (payload) => {
    return { type: 'PAGE_CHANGE', payload }
}

export const selectCustomer = (payload) => {
    return { type: 'SELECT_CUSTOMER', payload }
}

export const changeCustomerSort = (payload) => {
    return { type: 'CHANGE_CUSTOMER_SORT', payload }
}

export const changeCustomerFilter = (column, value) => {
    return { type: 'CHANGE_CUSTOMER_FILTER', column, value }
}
