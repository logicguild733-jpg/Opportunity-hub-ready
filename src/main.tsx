import React from "react";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

if (!root) {
  document.body.innerHTML = "<h1>❌ ROOT NOT FOUND</h1>";
} else {
  root.innerHTML = "<h1 style='color:black'>HTML WORKING ✅</h1>";

  setTimeout(() => {
    ReactDOM.createRoot(root).render(
      <h1 style={{ color: "black" }}>REACT WORKING ✅</h1>
    );
  }, 1000);
}
