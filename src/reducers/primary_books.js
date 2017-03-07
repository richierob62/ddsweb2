import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    ref_list: [
        {id: 1, display: 'Primary Book 1'},
        {id: 2, display: 'Primary Book 2'},
        {id: 3, display: 'Primary Book 3'},
        {id: 4, display: 'Primary Book 4'},
        {id: 5, display: 'Primary Book 5'},
        {id: 6, display: 'Primary Book 6'},
        {id: 7, display: 'Primary Book 7'},
        {id: 8, display: 'Primary Book 8'},
        {id: 9, display: 'Primary Book 9'},
        {id: 10, display: 'Primary Book 10'}
    ],
    typeahead: ''
})

const primary_books = (state = initial_state, action) => {
    switch (action.type) {
        default: return state
    }
}

export default primary_books

