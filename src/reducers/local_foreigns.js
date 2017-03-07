import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
    ref_list: [
        {id: 1, display: 'Loc/Foreign 1'},
        {id: 2, display: 'Loc/Foreign 2'},
        {id: 3, display: 'Loc/Foreign 3'},
        {id: 4, display: 'Loc/Foreign 4'},
        {id: 5, display: 'Loc/Foreign 5'},
        {id: 6, display: 'Loc/Foreign 6'},
        {id: 7, display: 'Loc/Foreign 7'},
        {id: 8, display: 'Loc/Foreign 8'},
        {id: 9, display: 'Loc/Foreign 9'},
        {id: 10, display: 'Loc/Foreign 10'}
    ],
    typeahead: ''
})

const local_foreigns = (state = initial_state, action) => {
    switch (action.type) {
        default: return state
    }
}

export default local_foreigns

