import Immutable from 'immutable';

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'L\'Oréal', address: '10 Leeton Ridge Ave. ', city: 'Wisconsin Rapids', state: 'WI', zip: '54494', area: '494', phone: '487-8119', account_num: '4041234', sales_rep: 3 },
        { id: 2, name: 'Adobe Systems', address: '121 NW. Indian Spring Street ', city: 'Lebanon', state: 'PA', zip: '17042', area: '664', phone: '810-1662', account_num: '4130144', sales_rep: 7 },
        { id: 3, name: 'Allianz', address: '164 Depot Ave. ', city: 'North Ridgeville', state: 'OH', zip: '44039', area: '440', phone: '215-4916', account_num: '9842555', sales_rep: 9 },
        { id: 4, name: 'Amazon.com', address: '2 Kirkland St. ', city: 'Matawan', state: 'NJ', zip: '7747', area: '601', phone: '777-4414', account_num: '1028587', sales_rep: 4 },
        { id: 5, name: 'American Express', address: '204 East Ryan St. ', city: 'Braintree', state: 'MA', zip: '2184', area: '517', phone: '185-6539', account_num: '8652533', sales_rep: 10 }
    ],
    selected_id: 4,
    sort_field: 'address',
    sort_direction: 'DESC',
    current_filters: {}
});

const customers = (state = initial_state, action) => {
    switch (action.type) {
        case 'SELECT_CUSTOMER': {
            return state.set('selected_id', action.payload);
        }
        case 'CHANGE_CUSTOMER_SORT': {
            const new_direction = action.payload === state.get('sort_field') ?
                (
                    state.get('sort_direction') === 'ASC' ?
                        'DESC' :
                        'ASC'
                ) :
                'ASC'
            return state.set('sort_field', action.payload).set('sort_direction', new_direction);
        }
        case 'CHANGE_CUSTOMER_FILTER': {
            return state.setIn(['current_filters', action.column], action.value);
        }
        default: return state;
    }
};

export default customers;