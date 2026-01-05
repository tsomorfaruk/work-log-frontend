import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload; // not having proper
    },
    userLoggedOut: (state) => {
      state.token = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.token;
