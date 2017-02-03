import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    ref_list: [
        {id: 1, display: 'Pay Plan 1'},
        {id: 2, display: 'Pay Plan 2'},
        {id: 3, display: 'Pay Plan 3'},
        {id: 4, display: 'Pay Plan 4'},
        {id: 5, display: 'Pay Plan 5'},
        {id: 6, display: 'Pay Plan 6'},
        {id: 7, display: 'Pay Plan 7'},
        {id: 8, display: 'Pay Plan 8'},
        {id: 9, display: 'Pay Plan 9'},
        {id: 10, display: 'Pay Plan 10'}
    ],
    typeahead: ''
})

const pay_plans = (state = initial_state, action) => {
    switch (action.type) {
        default: return state
    }
}

export default pay_plans

