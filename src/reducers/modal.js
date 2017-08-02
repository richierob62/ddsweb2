import Immutable from "immutable";

const initial_state = Immutable.fromJS({
  title: "",
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
        .set("message_list", message_list)
        .set("title", "Please fix the following...");

    case "SAVE_CUSTOMER_COMPLETED":
      return state
        .set("type", "success")
        .set("title", "Success")
        .set("text", "Saved successfully");

    case "DELETE_CUSTOMER_FAILED":
      message_list = Object.keys(action.payload).map(
        key => action.payload[key]
      );

      return state
        .set("type", "validation")
        .set("message_list", message_list)
        .set("title", "Deletion Not Permitted");

    case "DELETE_CUSTOMER_COMPLETED":
      return state
        .set("type", "success")
        .set("title", "Success")
        .set("text", "Saved deleted");

    case "CLOSE_MODAL":
      return state.set("type", "").set("message_list", []).set("title", "");

    default:
      return state;
  }
};

export default modal;
