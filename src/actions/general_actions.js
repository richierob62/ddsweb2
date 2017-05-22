const pageChange = (payload) => {
    return { type: 'PAGE_CHANGE', payload }
}

const sortChangeCompleted = (payload) => {
    return { type: 'SORT_CHANGE_COMPLETED', payload }
}

export {
    pageChange,
    sortChangeCompleted
}