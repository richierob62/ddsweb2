import Immutable from "immutable";

const initial_state = Immutable.fromJS({
  loggedIn: false,
  token: "foo",
  message: ""
});

const auth = (state = initial_state, action) => {
  switch (action.type) {
    case "BEGIN_LOGIN":
      return state
        .set("history_obj", action.payload.history)
        .set("next_page", action.payload.path)
        .set("loggedIn", false)
        .set("token", "");

    case "AUTH_FAIL":
      return state.set("message", action.payload.message);

    case "AUTH_SUCCESS":
      return state.set("email", action.payload.email)
      .set("name", action.payload.name)
      .set("code", action.payload.code)
      .set("token", action.payload.token)
      .set("loggedIn", true)
      .set("message", '')
      .set("sleep_start_time", (new Date()).getTime())

    case "CLEAR_LOGIN_ERROR":
      return state.set("message", "");

    default:
      return state;
  }
};

export default auth;
