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
  },
});

// Action creators are generated for each case reducer function
export const { handleChecking, handleLogin } = authSlice.actions;
