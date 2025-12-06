import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RootElement from "./routes/RootElement";
import { AuthProvider } from "./contexts/auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RootElement />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
