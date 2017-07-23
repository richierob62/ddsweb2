import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import actions from "../actions";

import { getModalMessageList } from "../selectors";

const mstp = state => {
  return {
    message_list: getModalMessageList(state)
  };
};

const StyledModal = styled.div`

  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;
  padding: 20px;

  #modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid #eceeef;

      #modal-title {
          margin-bottom: 0;
          line-height: 1.5;
          padding-right: 100px;
      }

      #button-close {
          padding: 0;
          cursor: pointer;
          background: 0 0;
          border: 0;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          color: #000;
          text-shadow: 0 1px 0 #fff;
          opacity: .5;                
      }
  }

  #modal-body {
      position: relative;
      flex: 1 1 auto;
      padding: 15px;
  }

  #modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 15px;
      border-top: 1px solid #eceeef;

      button {
          margin-left: 10px;
      }
  }
`;

const modal = props => {
  const { title, message_list, dispatch } = props;

  const handleClose = () => {
    dispatch(actions["closeModal"]());
  };

  const styled_messages_list = message_list.map((message, i) => (
    <li key={i} className="list-group-item" style={{ color: "indianred" }}>
      {message}
    </li>
  ));

  return (
    <StyledModal role="document">
      <div id="modal-header">
        <h5 id="modal-title">{title}</h5>
        <button
          type="button"
          id="button-close"
          aria-label="Close"
          onClick={handleClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div id="modal-body">
        <ul className="list-group">
          {styled_messages_list}
        </ul>
      </div>
      <div id="modal-footer">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </StyledModal>
  );
};

export default connect(mstp)(modal);
