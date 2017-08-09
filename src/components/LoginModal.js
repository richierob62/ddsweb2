import React from "react";

import { connect } from "react-redux";
import actions from "../actions";
import styled from "styled-components";
import { loginErrorMessage } from "../selectors";
import { CSSTransitionGroup } from "react-transition-group";

const mstp = state => {
  return {
    message: loginErrorMessage(state)
  };
};

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    outline: 0;
    background-color: rgba(128, 128, 128, 0.23);

    .login-dialog {
        margin: 100px auto;
        position: relative;
        width: 50%;
    }
`;

const StyledLabel = styled.label`
    color: rgba(26, 26, 26, 0.75);
    font-weight: lighter;
    font-size: .75rem;
    margin-right: 5px;
    margin-bottom: 0;
    margin-top: 1px;
    min-width: 100px;
    text-align: right;
`;

const EditableInput = styled.input`
    flex: 1;
    font-size: .8rem;
    color: #2C3E50;
    border: none;
    border-bottom: 1px solid #767676;
    margin-left: .75rem;
    margin-right: 2rem;
`;

const StyledErrorMessage = styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 300;
    text-align: center;
    margin-top: 20px;
    background-color: red;
    padding: 5px;
    color: white;
`;

const login = props => {
  const { dispatch, message } = props;

  const clearErrorMessage = () => {
    dispatch(actions.clearLoginError());
  };

  const submitHandler = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const payload = { email, pass };
    dispatch(actions.attemptLogin(payload));
  };

  return (
    <Wrapper>
      <div className="login-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Please log in</h5>
          </div>
          <div className="modal-body">
            <div style={{ display: "flex", padding: "10px" }}>
              <StyledLabel>Email :</StyledLabel>
              <EditableInput
                id="email"
                type="text"
                onChange={clearErrorMessage}
              />
            </div>
            <div style={{ display: "flex", padding: "10px" }}>
              <StyledLabel>Password :</StyledLabel>
              <EditableInput
                id="pass"
                type="password"
                onChange={clearErrorMessage}
              />
            </div>
            <CSSTransitionGroup
              transitionName="login_error_msg"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {message !== "" && message !== undefined
                ? <StyledErrorMessage key={"error_msg"}>
                    {message}
                  </StyledErrorMessage>
                : null}
            </CSSTransitionGroup>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default connect(mstp)(login);
