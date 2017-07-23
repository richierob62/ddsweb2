import Immutable from "immutable";

const initial_state = Immutable.fromJS({
  title: "",
  visible: false,
  type: "",
  message_list: []
});

const modal = (state = initial_state, action) => {
  let message_list;

  switch (action.type) {
    case "SAVE_CUSTOMER_FAILED":
      message_list = Object.keys(action.payload).map(
        key => action.payload[key]
      );

      return state
        .set("type", "validation")
        .set("visible", true)
        .set("message_list", message_list)
        .set("title", "Please fix the following...");

    case "CLOSE_MODAL":
      return state
        .set("type", "")
        .set("visible", false)
        .set("message_list", [])
        .set("title", "");

    default:
      return state;
  }
};

export default modal;
