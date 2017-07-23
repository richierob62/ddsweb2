import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import Modal from "./components/Modal";


const Root = props => {
  const { store, history, routes } = props;

  return (
    <Provider store={store}>
      <div>
        <Modal store={store} />
        <Router history={history} routes={routes} />
      </div>
    </Provider>
  );
};

export default Root;
