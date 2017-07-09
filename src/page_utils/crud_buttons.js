import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import actions from "../actions";
import { getActionWord, getCurrentRecord, getMode } from "../selectors";

const mstp = (state, ownProps) => ({
  mode: getMode(state[ownProps.page]),
  current_record: getCurrentRecord(state[ownProps.page]),
  action_word: getActionWord(state[ownProps.page])
});

const StyledButtonCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;

    .btn-sm {
        font-size: .7rem;
        margin: 2px 2px;
    }
`;

const NewButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "begin" + action_word + "Create";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-success"
    >
      New
    </button>
  );
};

const EditButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "begin" + action_word + "Edit";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-primary"
    >
      Edit
    </button>
  );
};

const DuplicateButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "begin" + action_word + "Duplicate";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-primary"
    >
      Duplicate
    </button>
  );
};

const DeleteButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "begin" + action_word + "Delete";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-danger"
    >
      Delete
    </button>
  );
};

const SaveButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "do" + action_word + "Save";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-success"
    >
      Save
    </button>
  );
};

const ConfirmDeleteButton = props => {
  const { action_word, dispatch } = props;

  // click_handler
  const click_handler_action_name = "do" + action_word + "Delete";
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className="btn btn-sm btn-outline-danger"
    >
      DELETE
    </button>
  );
};

const CancelButton = props => {
  const { action_word, dispatch, mode } = props;

  // click_handler
  const click_handler_action_name = "cancel" + action_word;
  const click_handler = () => dispatch(actions[click_handler_action_name]());

  const btn_classes = mode === "delete"
    ? "btn btn-sm btn-outline-success"
    : "btn btn-sm btn-outline-danger";

  return (
    <button
      type="button"
      onClick={click_handler.bind(null)}
      className={btn_classes}
    >
      Cancel
    </button>
  );
};

const contextMenuButtons = props => {
  const { mode, current_record } = props;

  const button_decisions = {
    new: mode === "display",
    edit: mode === "display" && current_record !== null,
    duplicate: mode === "display" && current_record !== null,
    delete: mode === "display" && current_record !== null,
    save: mode !== "display" && mode !== "delete" && current_record !== null,
    confirm_del: mode === "delete" && current_record !== null,
    cancel: mode !== "display" && current_record !== null
  };

  return (
    <StyledButtonCollection>
      {button_decisions.new && <NewButton {...props} />}
      {button_decisions.edit && <EditButton {...props} />}
      {button_decisions.duplicate && <DuplicateButton {...props} />}
      {button_decisions.delete && <DeleteButton {...props} />}
      {button_decisions.save && <SaveButton {...props} />}
      {button_decisions.confirm_del && <ConfirmDeleteButton {...props} />}
      {button_decisions.cancel && <CancelButton {...props} />}
    </StyledButtonCollection>
  );
};

export default connect(mstp)(contextMenuButtons);
