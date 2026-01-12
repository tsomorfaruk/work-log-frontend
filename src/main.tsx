import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RootElement from "./routes/RootElement";
// import { AuthProvider } from "./contexts/auth/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Provider store={store}>
        {/* <AuthProvider> */}
        <RootElement />
        {/* <Toaster position="top-center" /> */}
        {/* </AuthProvider> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
