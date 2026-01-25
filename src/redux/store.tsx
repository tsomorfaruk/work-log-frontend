import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// import { Provider } from "react-redux";
import authSliceReducer from "../services/auth/authSlice";
import uiReducer from "./slices/uiSlice";
import { errorMiddleware } from "./middlewares/errorMiddleware";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([apiSlice.middleware, errorMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   return <Provider store={store}>{children}</Provider>;
// };
