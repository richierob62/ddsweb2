import "./fa/css/font-awesome.min.css";
import "./styles/bootstrap.min.css";
import "../node_modules/react-widgets/dist/css/react-widgets.css";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert/dist/sweetalert.css";
import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./configureStore";
import Root from "./Root";
import root_saga from "./sagas/root_saga";

const store = configureStore();
store.runSaga(root_saga);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
