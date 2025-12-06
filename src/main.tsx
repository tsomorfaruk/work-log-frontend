import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RootElement from "./routes/RootElement";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RootElement />
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
