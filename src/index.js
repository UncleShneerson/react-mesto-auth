import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

const rootDiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
