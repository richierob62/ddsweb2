import Immutable from 'immutable';

const initial_state = Immutable.fromJS({
    loggedIn: true
});

const auth = (state = initial_state, action) => {
    switch (action.type) {
        case 'foo': return state;
        default: return state;
    }
};

export default auth;