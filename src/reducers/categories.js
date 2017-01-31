import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    ref_list: [
        {id: 1, display: 'category 1'},
        {id: 2, display: 'category 2'},
        {id: 3, display: 'category 3'},
        {id: 4, display: 'category 4'},
        {id: 5, display: 'category 5'},
        {id: 6, display: 'category 6'},
        {id: 7, display: 'category 7'},
        {id: 8, display: 'category 8'},
        {id: 9, display: 'category 9'},
        {id: 10, display: 'category 10'}
    ]
})

const categories = (state = initial_state, action) => {
    switch (action.type) {
        default: return state
    }
}

export default categories

