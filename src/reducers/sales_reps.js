import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    ref_list: [
        {id: 1, display: 'Sales Rep 1'},
        {id: 2, display: 'Sales Rep 2'},
        {id: 3, display: 'Sales Rep 3'},
        {id: 4, display: 'Sales Rep 4'},
        {id: 5, display: 'Sales Rep 5'},
        {id: 6, display: 'Sales Rep 6'},
        {id: 7, display: 'Sales Rep 7'},
        {id: 8, display: 'Sales Rep 8'},
        {id: 9, display: 'Sales Rep 9'},
        {id: 10, display: 'Sales Rep 10'}
    ]
})

const sales_reps = (state = initial_state, action) => {
    switch (action.type) {
        default: return state
    }
}

export default sales_reps

