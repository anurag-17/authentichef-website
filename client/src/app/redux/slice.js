"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  ad_details: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = action.null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = action.null;
    },
    setUserId: (state, action) => {
      state._id = action.payload;
    },

    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    removeSuccess: (state, action) => {
      state.success = action.null;
    },
  
    superAdminDetails: (state, action) => {
      state.superAdminDetails = action.payload;
    },
  },
});

export const {
  setUserId,
  setToken,
  removeToken,
  setUser,
  adDetails,
  superAdminDetails,
  rem_AdDetails,
  removeUser,
  setSuccess,
  removeSuccess,
} = authSlice.actions;

export default authSlice.reducer;
