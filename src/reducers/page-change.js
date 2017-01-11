import R from 'ramda';

const initial_state = {
    current_path: '/'
};

const pageChange = (state = initial_state, action) => {
    switch (action.type) {
        case 'PAGE_CHANGE': 
            return R.evolve({ current_path: action.payload }, state);
        default: return state;
    }
};

export default pageChange;