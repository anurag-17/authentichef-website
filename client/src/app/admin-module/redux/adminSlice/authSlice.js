"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ad_token: null,
  isLoggedIn : true ,
  ad_details: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      
    },
    removeToken: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
    },
    adDetails : (state, action) => {
        state.ad_details = action.payload;
    },
    rem_AdDetails: (state, action) => {
      state.ad_details = null;
    },
  },
});

export const { setToken, removeToken, adDetails,rem_AdDetails } = authSlice.actions;

export default authSlice.reducer;
