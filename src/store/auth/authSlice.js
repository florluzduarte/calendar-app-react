import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // "authenticated" | "not-authenticated"
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    handleChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    handleLogin: (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    handleLogout: (state, action) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleChecking, handleLogin, handleLogout, clearErrorMessage } =
  authSlice.actions;
