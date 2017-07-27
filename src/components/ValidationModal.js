import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../actions";

import { renderToStaticMarkup } from "react-dom/server";
import SweetAlert from "sweetalert-react";

import { getModalMessageList, getModalTitle } from "../selectors";

// import { renderToStaticMarkup } from 'react-dom/server';
// import swal from 'sweetalert';
// import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
// import 'sweetalert/dist/sweetalert.css';
// <SweetAlert
//     animation: PropTypes.oneOfType([ true, fales, 'pop', 'slide-from-top', 'slide-from-bottom' ])
//     cancelButtonText: PropTypes.string,
//     confirmButtonColor: PropTypes.string,
//     confirmButtonText: PropTypes.string,
//     customClass: PropTypes.string,
//     html: PropTypes.bool,
//     imageSize: PropTypes.string,
//     imageUrl: PropTypes.string,
//     inputPlaceholder: PropTypes.string,
//     inputType: PropTypes.oneOf(ALLOWS_INPUT_TYPES),
//     inputValue: PropTypes.string,
//     onCancel: PropTypes.func,
//     onClose: PropTypes.func,
//     onConfirm: PropTypes.func, --- swal.showInputError('You need to write something!');
//     onEscapeKey: PropTypes.func,
//     onOutsideClick: PropTypes.func,
//     show: PropTypes.bool,
//     showCancelButton: PropTypes.bool,
//     showConfirmButton: PropTypes.bool,
//     showLoaderOnConfirm: PropTypes.bool,
//     text: PropTypes.string --- text={renderToStaticMarkup(<HelloWorld />)}
//     title: PropTypes.string.isRequired,
//     type: PropTypes.oneOf(['warning', 'error', 'success', 'info', 'input']),
// />;

const mstp = state => {
  return {
    message_list: getModalMessageList(state),
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
    const { title, message_list } = this.props;

    const styled_messages_list = message_list.map((message, i) => (
      <li key={i} className="list-group-item" style={{ color: "indianred" }}>
        {message}
      </li>
    ));

    return (
      <SweetAlert
        animation="pop"
        showCancelButton={false}
        confirmButtonText={"OK"}
        html
        onClose={this.handleClose}
        onConfirm={this.handleClose}
        onEscapeKey={this.handleClose}
        onOutsideClick={this.handleClose}
        show={this.state.show}
        showConfirmButton={true}
        text={renderToStaticMarkup(
          <ul className="list-group">{styled_messages_list}</ul>
        )}
        title={title}
        type={"error"}
      />
    );
  }
}

export default connect(mstp)(modal);
