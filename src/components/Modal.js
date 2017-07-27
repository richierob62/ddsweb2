import React from "react";
import { connect } from "react-redux";
import ValidationModal from "./ValidationModal";
import SuccessModal from "./SuccessModal";

import { getModalType } from "../selectors";

const mstp = state => {
  return {
    modal_type: getModalType(state)
  };
};

const modal = props => {
  const { modal_type } = props;

  switch (modal_type) {
    case "validation":
      return <ValidationModal {...props} />;

    case "save_success":
      return <SuccessModal {...props} />;

    default:
      return null;
  }
};

export default connect(mstp)(modal);
