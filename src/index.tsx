import React from "react";
// import "./app/layout/assets/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/app/layout/assets/css/styles.css";
// import "../src/app/layout/assets/css/dashboard.css";
// import "../src/app/layout/assets/css/all.min.css"
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import "../src/app/layout/assets/css/index.css";

import "boxicons";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import "react-widgets/dist/css/react-widgets.css";
import "react-toastify/dist/ReactToastify.min.css";
import ScrollToTop from "./app/layout/ScrollToTop";
import { Router } from "react-router-dom";
import dateFnsLocalizer from "react-widgets-date-fns";

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
