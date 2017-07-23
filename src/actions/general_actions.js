const pageChange = payload => {
  return { type: "PAGE_CHANGE", payload };
};

const sortChangeCompleted = payload => {
  return { type: "SORT_CHANGE_COMPLETED", payload };
};

const closeModal = payload => {
  return { type: "CLOSE_MODAL", payload };
};

export { pageChange, sortChangeCompleted, closeModal };
