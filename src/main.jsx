import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ includes Popper (needed for dropdowns)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ContextProvider from "./Store/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
