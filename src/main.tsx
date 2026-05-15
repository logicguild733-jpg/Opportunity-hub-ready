import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// 🔥 SIMPLE ERROR LOGGING
window.onerror = (msg, url, line, col, error) => {
  console.error("GLOBAL ERROR:", msg, error);
};

window.onunhandledrejection = (event) => {
  console.error("PROMISE ERROR:", event.reason);
};

const root = document.getElementById("root");

if (!root) {
  document.body.innerHTML = "<h1>❌ ROOT NOT FOUND</h1>";
} else {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
