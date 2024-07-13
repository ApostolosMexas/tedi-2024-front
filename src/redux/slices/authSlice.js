import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      localStorage.setItem("userRole", action.payload.userRoleId);
      localStorage.setItem("tedi-token", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId)
    },
    logoutSuccess(state) {
      state.userId = null;
      localStorage.removeItem('tedi-token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');

    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice;
