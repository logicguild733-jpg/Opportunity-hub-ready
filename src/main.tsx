import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ✅ GLOBAL ERROR CATCH (VERY IMPORTANT)
window.onerror = function (msg, url, line, col, error) {
  console.error("🔥 GLOBAL ERROR:", error);
};

window.onunhandledrejection = function (event) {
  console.error("🔥 PROMISE ERROR:", event.reason);
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
