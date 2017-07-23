import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ValidationModal from "./ValidationModal";

import { getModalVisibility, getModalType, getModalTitle } from "../selectors";

const mstp = (state) => {
  return {
    visible: getModalVisibility(state),
    modal_type: getModalType(state),
    title: getModalTitle(state),
  };
};

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5000;
    display: ${({ visible }) => (visible ? "block" : "none")};    
    overflow: hidden;
    outline: 0;
    transition: opacity .15s linear;
    background-color: rgba(0,0,0,.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const modal = props => {
  const { visible, modal_type } = props;

  return !visible
    ? null
    : <StyledModal {...props}>
        { modal_type === 'validation' && <ValidationModal {...props} /> }
      </StyledModal>;
};

export default connect(mstp)(modal);
