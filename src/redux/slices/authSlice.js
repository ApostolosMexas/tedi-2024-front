import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.userId = action.payload.userId;
      localStorage.setItem("tedi-token", action.payload.accessToken);
    },
    logoutSuccess(state) {
      state.userId = null;
      localStorage.removeItem('tedi-token');
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice;
