import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

const rootDiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
