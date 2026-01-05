import { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const errorMiddleware: Middleware = () => (next) => (action: any) => {
  if (
    [400, 404, 500].includes(action.payload && action.payload.originalStatus)
  ) {
    toast.error("No Data Found. Try Again!");
  }
  return next(action);
};
