import Immutable from "immutable";

const initial_state = Immutable.fromJS({
  loggedIn: true,
  token: 'foo'
});

const auth = (state = initial_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default auth;
