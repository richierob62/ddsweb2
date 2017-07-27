import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../actions";

import SweetAlert from "sweetalert-react";

import { getModalText, getModalTitle } from "../selectors";

const mstp = state => {
  return {
    text: getModalText(state),
    title: getModalTitle(state)
  };
};

class modal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false }, () => {
      this.props.dispatch(actions["closeModal"]());
    });
  }

  render() {
    const { title, text } = this.props;

    return (
      <SweetAlert
        animation="pop"
        showCancelButton={false}
        confirmButtonText={"OK"}
        onClose={this.handleClose}
        onConfirm={this.handleClose}
        onEscapeKey={this.handleClose}
        onOutsideClick={this.handleClose}
        show={this.state.show}
        showConfirmButton={true}
        text={text}
        title={title}
        type={"success"}
      />
    );
  }
}

export default connect(mstp)(modal);
