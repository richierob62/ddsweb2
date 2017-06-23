import Immutable from "immutable";

const initial_state = Immutable.fromJS({
  current_path: "/"
});

const pageChange = (state = initial_state, action) => {
  switch (action.type) {
    case "PAGE_CHANGE":
      return state.set("current_path", action.payload);

    default:
      return state;
  }
};

export default pageChange;
