const pageChange = payload => {
  return { type: "PAGE_CHANGE", payload };
};

const sortChangeCompleted = payload => {
  return { type: "SORT_CHANGE_COMPLETED", payload };
};

const closeModal = payload => {
  return { type: "CLOSE_MODAL", payload };
};

const beginLogin = payload => {
  return { type: "BEGIN_LOGIN", payload };
};

const attemptLogin = payload => {
  return { type: "ATTEMPT_LOGIN", payload };
};

const authFail = payload => {
  return { type: "AUTH_FAIL", payload };
};

const authSuccess = payload => {
  return { type: "AUTH_SUCCESS", payload };
};

const clearLoginError = () => {
  return { type: "CLEAR_LOGIN_ERROR" };
};

export {
  pageChange,
  sortChangeCompleted,
  closeModal,
  beginLogin,
  attemptLogin,
  authFail,
  authSuccess,
  clearLoginError
};
