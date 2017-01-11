export const isLoggedIn = (state) => state.auth.loggedIn;

// export const getCustomerList = (state) => {
//     return state['customers'].get('list');
// }

// export const getSelectedCustomerID = (state) => {
//     return state['customers'].get('selected_id');
// }

// export const getCustomerSortField = (state) => {
//     return state['customers'].get('sort_field');
// }

// export const getCustomerSortDirection = (state) => {
//     return state['customers'].get('sort_direction');
// }

// export const getCustomerFilters = (state) => {
//     return state['customers'].get('current_filters');
// }

// export const getCustomerDetails = (state) => {
//     const id = state['customers'].get('selected_id');
//     return state['customers'].get('list').find(
//         item => item.get('id') === id,
//         this,
//         null
//     )
// }

// export const getCustomerIsSelected = (state) => {
//     return getCustomerDetails(state) === null ? false : true;
// }


// export const getCustomerMode = (state) => {
//     return state['customers'].get('mode');
// }

