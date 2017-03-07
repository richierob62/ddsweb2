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

export const selectCustomerTab = (payload) => {
    return { type: 'SELECT_CUSTOMER_TAB', payload }
}

export const changeCustomerData = (payload) => {
    return { type: 'CHANGE_CUSTOMER_DATA', payload }
}

export const sales_repTypeaheadChange = (payload) => {
    return { type: 'SALES_REP_TYPEAHEAD', payload }
}

export const filter_orders_on_account_num = (payload) => {
    return { type: 'CHANGE_ORDER_FILTER', payload: {account_num: payload} }
}

export const select_id_in_primary_books = (payload) => {
    return { type: 'SELECT_PRIMARY_BOOK', payload }
}

export const select_id_in_sales_reps = (payload) => {
    return { type: 'SELECT_SALES_REP', payload }
}

export const beginCustomerEdit = () => {
    return { type: 'BEGIN_CUSTOMER_EDIT' }
}

export const beginCustomerCreate = () => {
    return { type: 'BEGIN_CUSTOMER_CREATE' }
}

export const beginCustomerDuplicate = () => {
    return { type: 'BEGIN_CUSTOMER_DUPLICATE' }
}

export const beginCustomerDelete = () => {
    return { type: 'BEGIN_CUSTOMER_DELETE' }
}

export const cancelCustomer = () => {
    return { type: 'CANCEL_CUSTOMER' }
}
